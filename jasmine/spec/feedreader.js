/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Below test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have URLs defined', function () {
            var url;
            for (let i = 0; i < allFeeds.length; i++) {
                url = allFeeds[i].url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            }
        });



        /* Below test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have names defined', function () {
            var name;
            for (let i = 0; i < allFeeds.length; i++) {
                name = allFeeds[i].name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            }
        });
    });


    /* a new test suite named "The menu" */

    /* Below test ensures the menu element is
     * hidden by default. Analyzes the HTML and
     * the CSS to determine how the
     * hiding/showing of the menu element is happening.
     */

    describe('The menu', function () {

        it('is hidden by default', function () {
            var isMenuHidden = document.querySelector('body').classList.contains("menu-hidden");
            expect(isMenuHidden).toBe(true);
        });

        /* Below is the test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */


        it('changes visibility', function () {
            var test1Result = 'Hidden',
                test2Result = 'notHidden';

            document.querySelector('.menu-icon-link').click();

            if (!document.querySelector('body').classList.contains("menu-hidden")) {
                test1Result = 'notHidden';
            }

            document.querySelector('.menu-icon-link').click();

            if (document.querySelector('body').classList.contains("menu-hidden")) {
                test2Result = 'Hidden';
            }

            expect(test1Result).toBe('notHidden');
            expect(test2Result).toBe('Hidden');


        });

    });



    /* Test suite named "Initial Entries" */

    /* Below test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * loadFeed() is asynchronous so this test uses
     * Jasmine's beforeEach and asynchronous done() function.
     */


    describe('Initial Entries', function () {

        //this beforeEach makes sure that feed is loaded and done before the test is run
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        //feedLength is the number of feed entries in feed.
        //It should be greater than 0 for this test to pass. 
        it('has atleast one initial element', function () {
            var feedLength = document.querySelectorAll('.feed .entry-link').length;
            expect(feedLength).toBeGreaterThan(0);
        });
    });


    /* test suite named "New Feed Selection" */

    /* Below test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */

    describe('New Feed Selection', function () {

        var firstFeed, latestFeed;

        //before testing first feed is loaded and saved in firstFeed variable and 
        //then next feed is loaded 
        beforeEach(function (done) {
            loadFeed(1, function () {
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(0, done);
            });
        });

        //the content from next feed is saved in latestFeed variable and it is compared
        //with firstFeed. Both the content should be different for this test to pass.
        it('content changes on loading new feed', function () {
            latestFeed = document.querySelector('.feed').innerHTML;
            expect(latestFeed).not.toEqual(firstFeed);

        });

    });

}());