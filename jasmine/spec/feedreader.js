/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function(){

  describe('RSS Feeds', function(){

    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * pag
     */

    it('are defined', function(){
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    it("names are defined", function(){
      for (var x = 0; x < allFeeds.length; x++){
        expect(allFeeds[x].name).toBeDefined();
        expect(allFeeds[x].name.length).not.toBe(0);
      }
    });

    /* This test loops through each feed
     * in the allFeeds object and ensures it has a NAME defined
     * and that the name is not empty.
     */

    it("URLs are defined", function(){
      for (var x = 0; x < allFeeds.length; x++){
        expect(allFeeds[x].url).toBeDefined();
        expect(allFeeds[x].url.length).not.toBe(0);
      }
    });

  });

  describe("The Menu", function(){

    /* This test ensures the menu element is
     * hidden by default. It checks to see if
     * the menu icon has the '.menu-hidden' class
     * that hides the menu by default
     */

    it("is hidden by default", function(){
      var hidden = $("body").hasClass("menu-hidden");
      expect(hidden).toBeTruthy();
    });

     /* The two tests below ensures the menu changes
      * visibility when the menu icon is clicked. The
      * menu should toggle between hidden and visible.
      */

    it("displays menu when clicked", function(){
      $(".menu-icon-link").click();
      expect($("body").hasClass("menu-hidden")).toEqual(false);
    });

    it("hides menu when clicked again", function(){
      $(".menu-icon-link").click();
      expect($("body").hasClass("menu-hidden")).toEqual(true);
    }); 

  });

  describe("Initial Entries", function(){

    /* This test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * The loadFeed() is asynchronous so this uses the beforeEach function
     * before each test and done() function when complete.
     */

    beforeEach(function(done){
      loadFeed(0, done);
    });

    it("feed has at least one entry", function(){
      var entry = $(".feed .entry").length;
      expect(entry).toBeTruthy();
    });

  });

  describe("New Feed Selection", function(){

  /* This test ensures when a new feed is loaded
   * by the loadFeed function that the content actually changes.
   * The beforeEach function here loads the initial content then the test
   * compares that of the second load to check the difference in content.
   */

    var firstLoad;
    var secondLoad;
   
    beforeAll(function(done){
      loadFeed(1, function(){
        firstLoad = $(".feed").text();
        loadFeed(2, function(){
          secondLoad = $(".feed").text();
          done();
        });
      });
    });

    it("content changes when feed loads", function(done){
      expect(firstLoad).not.toEqual(secondLoad);
      done();
    });
  });
   
}());

