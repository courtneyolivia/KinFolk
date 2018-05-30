// @flow
/* eslint-disable quote-props */
import {User} from "./Model";

const DEFAULT_USER = (name: string): User => ({
    profile: {
        name,
        "birthday": 519948000000,
        "emailNotifications": true,
        "phoneNotifications": true
    },
    lists: {
        "9IjrOBdfw5WtTNutIk5cHVQL01n2": {
            "name": "Food",
            "description": "Need to buy",
            "items": {
                "0O03H3pK31Q8S7s1R7KatUNYh8H2": {
                    "title": "Quinoa",
                    "done": true
                },
                "0Ocs72hgKzR7VjdbNhVQuT61t1P2": {
                    "title": "Cucumber",
                    "done": false
                },
                "1XdhhS9jrQORQZNdcOge7FXHpao2": {
                    "title": "Tomatoes",
                    "done": false
                }
            }
        },
        "9KL70GjcHJXc4VxMqrnwY5pfBIk1": {
            "name": "Work",
            "description": "Freelance projects",
            "items": {
                "23iHCTuwstcRGNPc5O4W3jR7IwN2": {
                    "title": "Design New Icon",
                    "done": true
                },
                "2mUar3RCYabHSb8MfOj1vkQ1Nby1": {
                    "title": "Work on UI Kit",
                    "done": false
                },
                "3M6Ok3kOfyYElnIEYxYTALQOMqf1": {
                    "title": "Read article \"Designing for Mobile\"",
                    "done": false
                },
                
                "3rEh63HRkNgQlnCZwFadNp2tuq52": {
                    "title": "Catch up with Mary",
                    "done": false
                }
            }
        },
        "9bLLaKDcwvaN29Xdz8c37huuwO63": {
            "name": "Vacations",
            "description": "Favorite places",
            "items": {
                "5hksBFWIGyY2MOm5Hic82KSjwfw1": {
                    "title": "Quiberon",
                    "done": false
                },
                "5jA32f0NOLPbT4aTvAXp7iDpF6Y2": {
                    "title": "Los Angeles",
                    "done": false
                },
                "6bUG14ujOwTFbTNQnBKtxLEKNHu1": {
                    "title": "Bali",
                    "done": false
                }
            }
        },
        "9hkDCjjgcVcg3eyqzyQ35JpMDD23": {
            "name": "Cities",
            "description": "Want to visit",
            "items": {
                "7PQynZTHflb9lfiBcaWnsghQMdt1": {
                    "title": "San Fransico",
                    "done": false
                },
                "7glcWoNgrJWJPNOZJJeVvWqXcd02": {
                    "title": "Palo Alto",
                    "done": false
                },
                "7v6gA0e30MTkhblxikMsuuMMtxA3": {
                    "title": "Stockholm",
                    "done": false
                },
                "9Bh4aDQ9fbR520aW4aQcaq8nCcn2": {
                    "title": "Reykjavik",
                    "done": false
                }
            }
        }
    },
    
});

export {DEFAULT_USER};
