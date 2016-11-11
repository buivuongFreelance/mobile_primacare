/*$(document).on('pageInit', function(){
    
});*/

// Initialize your app
var myApp = new Framework7({
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

//URL HTTP
var API_URL = 'http://localhost/primacare/public/api/mobile/';
var API_IMAGE = 'http://localhost';

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('homepage', function (page) {
    // run createContentPage func after link was clicked
    

    $$.get(API_URL+'posts/homepage', function(data){
        data = JSON.parse(data);
        $$('#content').html(data.content);
    });
});

myApp.onPageInit('aboutus', function (page) {
    $$.get(API_URL+'posts/about-us', function(data){
        data = JSON.parse(data);
        $$('#content-aboutus').html(data.content);
    });
});

myApp.onPageInit('toc', function (page) {
    $$.get(API_URL+'posts/term-of-conditions', function(data){
        data = JSON.parse(data);
        $$('#content-toc').html(data.content);
    });
});

myApp.onPageInit('sitemap', function (page) {
    $$.get(API_URL+'posts/sitemap', function(data){
        data = JSON.parse(data);
        $$('#content-sitemap').html(data.content);
    });
});

myApp.onPageInit('services', function (page) {
    $$('.services-list').empty();
    $$.get(API_URL+'services', function(data){
        data = JSON.parse(data);
        for(var i = 0; i < data.length; i++){
            var service = data[i];
            var serviceHTML = '<li class="card facebook-card" id="service_'+service.id+'"'
                            +   '<div class="card-header">'
                            +       '<div class="facebook-name">'
                            +           service.name
                            +       '</div>'
                            +   '</div>'
                            +   '<div class="card-content">'
                            +       '<div class="card-content-inner">'
                            +           '<p>'+service.description+'</p>'
                            +           '<img src="'+API_IMAGE+service.photo_url+'" width="100%">'
                            +       '</div>'
                            +   '</div>';
                            + '</li>';
            $$('.services-list').append(serviceHTML);
            $('.services-list').delegate('li', 'click', function(event){
                var id = $(this).attr('id').split('_')[1];
                mainView.router.load({url: 'service.html', query:{id: id} });
            });
        }
    });
});

myApp.onPageInit('service', function(page){
    var id = page.query.id;
    $$.get(API_URL+'service/'+id, function(data){
        data = JSON.parse(data);
        $$('#service-content').html(data.content);
        $$('#service-toolbar-name').text(data.name);
        $$('#service-name').text(data.name);
        $('#service-name').css('background-image', 'url('+API_IMAGE+data.photo_url+')');
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}