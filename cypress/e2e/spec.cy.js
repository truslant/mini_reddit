describe('reddit_mini', () => {

    beforeEach(() => {
        cy.intercept(
            // { method: 'GET', url: 'http://www.reddit.com/r/popular.json' },
            { method: 'GET', url: 'http://localhost:5173/r/popular.json' },
            {
                body: {
                    data: {
                        children: [
                            {
                                data: {
                                    subreddit_name_prefixed: "r/FuckImOld",
                                }
                            },
                            {
                                data: {
                                    subreddit_name_prefixed: "r/FuckImYoung",
                                }
                            }
                        ]
                    }
                }
            }
        ).as('getRedditPopular');
        cy.intercept(
            // { method: "GET", url: "http://www.reddit.com/r/FuckImOld.json" },
            { method: "GET", url: "http://localhost:5173/r/FuckImOld.json" },
            {
                body: {
                    data: {
                        children: [
                            {
                                data:
                                {
                                    title: 'Post 1 title',
                                    author: 'Post1 Author',
                                    created: '1723932443',
                                    thumbnail: 'https://localhost:5173/',
                                    // thumbnail: 'https://www.reddit.com',
                                    ups: 999,
                                    num_comments: 777,
                                    permalink: "/r/FuckImOld/comments/1"
                                }
                            },
                            {
                                data:
                                {
                                    title: 'Post 2 title',
                                    author: 'Post2 Author',
                                    created: '1723932443',
                                    thumbnail: 'https://localhost:5173/',
                                    // thumbnail: 'https://www.reddit.com',
                                    ups: 888,
                                    num_comments: 555,
                                    permalink: "/r/FuckImOld/comments/2"
                                }
                            }
                        ]
                    }
                }
            }
        ).as('getRedditOld');
        cy.intercept(
            // { method: "GET", url: "http://www.reddit.com/r/FuckImOld.json" },
            { method: "GET", url: "http://localhost:5173/r/FuckImYoung.json" },
            {
                body: {
                    data: {
                        children: [
                            {
                                data:
                                {
                                    title: 'Post 1 title Young',
                                    author: 'Post1 Author Young',
                                    created: '1723932443',
                                    thumbnail: 'https://localhost:5173/',
                                    // thumbnail: 'https://www.reddit.com',
                                    ups: 999,
                                    num_comments: 777,
                                    permalink: "/r/FuckImOld/comments/1"
                                }
                            },
                            {
                                data:
                                {
                                    title: 'Post 2 title Young',
                                    author: 'Post2 Author Young',
                                    created: '1723932443',
                                    thumbnail: 'https://localhost:5173/',
                                    // thumbnail: 'https://www.reddit.com',
                                    ups: 888,
                                    num_comments: 555,
                                    permalink: "/r/FuckImOld/comments/2"
                                }
                            }
                        ]
                    }
                }
            }
        ).as('getRedditYoung');
        cy.intercept(
            { method: "GET", url: "http://localhost:5173/r/FuckImOld/comments/1.json" },
            // { method: "GET", url: "http://www.reddit.com/r/FuckImOld/comments/1.json" },
            {
                body: [
                    {},
                    {
                        data: {
                            children: [
                                {
                                    data: {
                                        body: 'Reddit comment 1',
                                        author: 'Comment 1 Author',
                                        created: '1723932443',
                                        id: '1'
                                    }
                                }
                            ]
                        }
                    }

                ]

            }
        ).as('getRedditComment');
        cy.intercept(
            { method: "GET", url: "http://localhost:5173/r/FuckImOld/comments/2.json" },
            // { method: "GET", url: "http://www.reddit.com/r/FuckImOld/comments/1.json" },
            {
                body: [
                    {},
                    {
                        data: {
                            children: [
                                {
                                    data: {
                                        body: 'Reddit comment 2',
                                        author: 'Comment 2 Author',
                                        created: '1723932443',
                                        id: '2'
                                    }
                                }
                            ]
                        }
                    }

                ]

            }
        ).as('getRedditComment2');
        cy.visit('/');
    })

    it('visits initial project page', () => {
        // cy.wait('@getRedditPopular')
        // cy.get('@getRedditPopular').then((interception) => {
        //     console.log(interception);
        //     cy.log(interception.response.body);
        // });
        // cy.wait('@getRedditOld')
        // cy.get('@getRedditOld').then((interception) => {
        //     console.log(interception);
        //     cy.log(interception.response.body);
        // });
        cy.contains('Post 1 title');
    });

    it('renders all channels, posts and comments', () => {
        cy.get('[data-cy="channelMenuItem"]').should('have.length', 2);
        cy.get("[data-cy='channelMenuItem']").eq(0).should('contain.text', 'r/FuckImOld');
        cy.get("[data-cy='channelMenuItem']").eq(1).should('contain.text', 'r/FuckImYoung');
        cy.get("[data-cy='cyPost']").should('have.length', 2);
        cy.get("[data-cy='cyPost']").eq(0).should('contain.text', 'Post 1 title');
        cy.get("[data-cy='cyPost']").eq(1).should('contain.text', 'Post 2 title');
        cy.get("[data-cy='channelDisplay']").should('contain.text', 'r/FuckImOld');
    });

    it('switches the channel', () => {
        cy.get("[data-cy='channelMenuItem']").eq(1).click();
        cy.get("[data-cy='channelDisplay']").should('contain.text', 'r/FuckImYoung');
        cy.get("[data-cy='cyPost']").eq(0).should('contain.text', 'Post 1 title Young');
        cy.get("[data-cy='cyPost']").eq(1).should('contain.text', 'Post 2 title Young');
    });

    it('filters the posts', () => {
        cy.get("[data-cy='cySearchInput']").type('Post 1');
        cy.get("[data-cy='cyPost']").should('have.length', 1);
        cy.get("[data-cy='cyPost']").should('contain.text', 'Post 1 title');
    });

    it('should show comments', () => {
        cy.get("[data-cy='cyCommentsButton']").eq(0).click();
        cy.get("[data-cy='cyComment']").should('contain.text', 'Reddit comment 1');
        cy.get("[data-cy='cyCommentsButton']").eq(1).click();
        cy.get("[data-cy='cyComment']").should('contain.text', "Reddit comment 2");
        cy.get("[data-cy='cyCommentsButton']").eq(0).click();
        cy.get("[data-cy='cyComment']").should('not.contain.text', 'Reddit comment 1');
        cy.get("[data-cy='cyCommentsButton']").eq(1).click();
        cy.get("[data-cy='cyComment']").should('not.exist');
    })
});
