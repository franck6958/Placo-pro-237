package com.placopro237.app;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.ClipDrawable;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.LayerDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

/**
 * Application PLACO PRO 237 : affiche le site https://placopro237.com/ en plein écran.
 * Les liens externes (téléphone, WhatsApp, e-mail, cartes…) s'ouvrent dans l'application adaptée.
 */
public class MainActivity extends Activity {

    private static final String HOME = "https://placopro237.com/";
    private static final String OFFLINE = "file:///android_asset/offline.html";

    private WebView web;
    private ProgressBar progress;
    private String failedUrl = HOME;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.parseColor("#F7F6F4"));

        web = new WebView(this);
        root.addView(web, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        progress = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        progress.setMax(100);
        ClipDrawable bar = new ClipDrawable(new ColorDrawable(Color.parseColor("#D9620F")), Gravity.START, ClipDrawable.HORIZONTAL);
        LayerDrawable layers = new LayerDrawable(new android.graphics.drawable.Drawable[] {
                new ColorDrawable(Color.TRANSPARENT), bar });
        layers.setId(0, android.R.id.background);
        layers.setId(1, android.R.id.progress);
        progress.setProgressDrawable(layers);
        FrameLayout.LayoutParams lp = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(3));
        lp.gravity = Gravity.TOP;
        root.addView(progress, lp);

        setContentView(root);
        setupWebView();

        if (savedInstanceState != null) {
            web.restoreState(savedInstanceState);
        } else {
            web.loadUrl(startUrl(getIntent()));
        }
    }

    private void setupWebView() {
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setMediaPlaybackRequiresUserGesture(true);
        s.setAllowFileAccess(false);
        s.setSupportMultipleWindows(false);
        // Permet au site de savoir qu'il est affiché dans l'application (pour masquer le bouton « Télécharger l'application »)
        s.setUserAgentString(s.getUserAgentString() + " PlacoPro237App/1.0");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        }
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);

        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progress.setProgress(newProgress);
                progress.setVisibility(newProgress >= 100 ? View.GONE : View.VISIBLE);
            }
        });

        web.setWebViewClient(new WebViewClient() {
            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleUrl(url);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleUrl(request.getUrl().toString());
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                progress.setVisibility(View.VISIBLE);
            }

            @Override
            @SuppressWarnings("deprecation")
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                showOffline(failingUrl);
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()) {
                    showOffline(request.getUrl().toString());
                }
            }
        });
    }

    /** true = le lien est pris en charge hors de la WebView. */
    private boolean handleUrl(String url) {
        if (url == null) return false;
        Uri uri = Uri.parse(url);
        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase();

        // Bouton « Réessayer » de la page hors connexion
        if ("placo".equals(scheme)) {
            web.loadUrl(failedUrl);
            return true;
        }
        if (("https".equals(scheme) || "http".equals(scheme))
                && (host.equals("placopro237.com") || host.equals("www.placopro237.com"))) {
            // Le fichier APK lui-même : inutile dans l'application, on l'ouvre dans le navigateur
            if (uri.getPath() != null && uri.getPath().endsWith(".apk")) {
                return openExternal(uri);
            }
            return false;
        }
        if ("intent".equals(scheme)) {
            try {
                Intent intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
                intent.addCategory(Intent.CATEGORY_BROWSABLE);
                intent.setComponent(null);
                intent.setSelector(null);
                startActivity(intent);
            } catch (Exception e) {
                Toast.makeText(this, "Application introuvable", Toast.LENGTH_SHORT).show();
            }
            return true;
        }
        return openExternal(uri);
    }

    private boolean openExternal(Uri uri) {
        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
        Intent intent = "tel".equals(scheme) ? new Intent(Intent.ACTION_DIAL, uri)
                : "mailto".equals(scheme) ? new Intent(Intent.ACTION_SENDTO, uri)
                : new Intent(Intent.ACTION_VIEW, uri);
        try {
            startActivity(intent);
        } catch (ActivityNotFoundException e) {
            Toast.makeText(this, "Aucune application pour ouvrir ce lien", Toast.LENGTH_SHORT).show();
        }
        return true;
    }

    private void showOffline(String url) {
        if (url != null && url.startsWith("http")) failedUrl = url;
        web.loadUrl(OFFLINE);
    }

    private String startUrl(Intent intent) {
        Uri data = intent == null ? null : intent.getData();
        if (data != null && data.getHost() != null && data.getHost().toLowerCase().endsWith("placopro237.com")) {
            return data.toString();
        }
        return HOME;
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        if (intent != null && intent.getData() != null) {
            web.loadUrl(startUrl(intent));
        }
    }

    @Override
    public void onBackPressed() {
        String current = web.getUrl();
        if (OFFLINE.equals(current)) {
            super.onBackPressed();
        } else if (web.canGoBack()) {
            web.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        web.saveState(outState);
    }

    @Override
    protected void onPause() {
        super.onPause();
        web.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        web.onResume();
    }

    @Override
    protected void onDestroy() {
        if (web != null) {
            web.destroy();
        }
        super.onDestroy();
    }

    private int dp(int v) {
        return Math.round(v * getResources().getDisplayMetrics().density);
    }
}
