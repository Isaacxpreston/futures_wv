<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title><?php wp_title(); ?></title>
    <meta name="viewport" content="width=device-width" />
    <?php wp_head(); ?>
    <script type='text/javascript'>
      (function (d, t) {
        var bh = d.createElement(t), s = d.getElementsByTagName(t)[0];
        bh.type = 'text/javascript';
        bh.src = 'https://www.bugherd.com/sidebarv2.js?apikey=kjlvjaqtqgfplsxzu7jkdg';
        s.parentNode.insertBefore(bh, s);
        })(document, 'script');
    </script>
  </head>
  <body <?php body_class(); ?>>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <?php wp_footer(); ?>
  </body>
</html>
