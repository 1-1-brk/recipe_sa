import React from 'react'
import { Link } from 'react-router-dom';

function MainNeLe () {


    return (
    <>
        <div class="newsletter">
            <div class="newsletter-text">
            <div class="header">
            <h3 class="headline">Deliciously Fake Newsletter</h3>
            <h5 class="subheadline">Discover Mouthwatering Recipes</h5>
            </div>
            {/* <div class="image">
            <img src="https://via.placeholder.com/400x200" alt="Delicious Food"/>
            </div> */}
            <div class="content">
            <p>Dear Food Lovers,</p>
            <p>Are you ready to embark on a culinary adventure? Get ready for a tantalizing journey through a world of flavors and recipes that will tickle your taste buds!</p>
            <p>From hearty comfort foods to exotic delights, our fake recipe sharing community has it all. Join us and explore imaginative recipes that are as delicious as they are fictional.</p>
            <p>Don't miss out on the fun! Subscribe now to receive mouthwatering recipes that exist only in the realm of imagination.</p>
                    <p></p>
            {/* Ah, the wonderful world of culinary delights! Have you ever noticed that food has a magical way of making life all the more scrumptious? It's like a symphony of flavors, a dance of ingredients, and a never-ending quest for that perfect bite.

Let's start with the avocado, the diva of the produce aisle. It's the fruit that's always ready for a close-up. One minute, it's as hard as a rock, and the next, it's softer than a pillow. Timing is everything with this green goddess. Slice it open, and you're either met with perfection or an avocado that's decided to play hard to get.

Now, let's talk about the elusive truffle. These fungi are so fancy that even their name sounds posh. They're like the James Bond of the culinary world, hiding underground, waiting to be discovered. Truffle hunters and their trusty hounds embark on secret missions, armed with nothing but a nose for decadence. Finding one is like finding a gourmet treasure chest.

And then there's bacon—the unofficial ambassador of indulgence. Is there anything bacon can't make better? It's the secret ingredient that turns a boring salad into a carnivore's dream. When bacon sizzles, the world stops to listen.

But let's not forget about the humble potato. Potatoes are the chameleons of the kitchen, transforming themselves into everything from crispy fries to creamy mashed goodness. They're the quiet heroes of comfort food, always there when you need a hug on a plate.

And now, dessert. Chocolate, the sweet seducer. It's the reason we endure salads and kale smoothies—so we can justify that extra piece of chocolate cake. Dark, milk, or white, it doesn't matter. Chocolate makes everything better. It's like a warm hug for your taste buds.

In the realm of recipes, we've all encountered those that read like a secret code. 'Simmer until reduced by half,' they say. But how do you measure half of an abstract concept like reduction? It's a culinary riddle for the ages.

And who can forget the chaos of cooking dinner for a group of friends? Suddenly, you're not just a chef; you're a negotiator, therapist, and entertainer. 'Susan is gluten-free, John is vegan, and Karen only eats organic. Oh, and Dave is allergic to everything green.' It's a culinary circus, and you're the ringmaster.

In conclusion, the world of food and recipes is a delightful, absurd, and utterly delicious journey. It's a reminder that life is best enjoyed with a side of laughter and a dash of culinary creativity. So, embrace the quirks, savor the flavors, and always save room for dessert. Bon appétit! */}
            <div class="cta">
                    {/* <a href="/">Sign Up Now</a> */}
                <Link to='/MyAccount' className='btn btn-info' title='MyAccount'>
                <span>
                    <em >Sign Up Now</em>
                </span>
                </Link>
            </div>
                </div>
            </div>
        </div>
    </>

    )
}

export default MainNeLe;