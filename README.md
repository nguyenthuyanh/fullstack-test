# We Link fullstack test

You'll have to make a three steps satisfaction form with [Ruby on Rails](https://rubyonrails.org/) that'll look like:

![Three steps form wireframe](https://github.com/we-link/fullstack-test/blob/main/wireframe2.png?raw=true)

## Instructions

1. First thing first, fork this repository.

2. Start with two routes:
  * A GET request on `/feedback/new` will display the form
  * A POST request on `/feedback` will save the informations

3. Firstname, Lastname and Email will be stored into a database (Sqlite is fine but you can use whatever you want as long as it's supported by ActiveRecord).
  * Save infos and messages in two disctinct tables
  * Update infos if the same email is used more than once instead of adding an entry.
  * Database operations must only be performed after the second step, not after the first one.

4. All the fields are mandatory, you shoudln't be able to go to the next step if a field is missing or invalid, you musn't save an empty or invalid field in the DB.

5. There shouldn't be a (real) page reload between two steps.
  * (We're using [React's function components](https://reactjs.org/docs/components-and-props.html#function-and-class-components) here at We Link)
  * ([React Rails](https://github.com/reactjs/react-rails) can be useful)

6. Make it fancy (at least less ugly than my wireframe)

7. Now allow the `/feedback` route to accept a GET request
  * with two parameters: `p` and `n` (eg: http://localhost/feedback?p=1&n=10), the response will be a JSON document containing a set of messages depending of the params, p=1 and n=10 will return messages 1 to 10, p=3 and n=15 will return messages 46 to 60.
  * If no param is provided, or if you got only one of the two, return a JSON document containing all messages.

8. Last route will be `feedback/:id` and will return a JSON document containing the message with the given ID.

9. Fill the below install section of this README with what I'll have to do to run your app locally.

## Install

```
git clone https://github.com/nguyenthuyanh/fullstack-test.git
bundle install
rake db:create
rake db:migrate
rails s
```

Running test

`rspec`

## Additional notes

You don't have a time limit to finish.

If you struggle, do the most that you can, I'll be glad to talk with you about what went wrong.

Try to commit your work more than once while you're coding, and efficiently.

Good luck!
