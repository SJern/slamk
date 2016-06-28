# Slamk

[Heroku link][heroku] **Note:** This should be a link to your production site

[heroku]: http://steven-hacking-cheong.tumblr.com/

## Minimum Viable Product

Slamk is a web application inspired by Slack that will be built using Ruby on Rails, React.js and WebSockets.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README
- [ ] Live chat
  - [ ] Real-time messaging
- [ ] Channels
  - [ ] Channel creation and administration
  - [ ] Join channels
- [ ] Direct Message
  - [ ] Single or Multi-Person Direct Message
- [ ] User profile editing
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] CSS styling that is satisfactorily visually appealing

![channel]
[channel]: ./docs/wireframes/channel_wireframe.png

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication & Team Site Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at App Academy. By the end of this phase, users will be able to log in & start or see their a team sites and create channels. The most important part of this phase will be pushing the app to Heroku and ensuring that everything works before moving on to phase 2.

### Phase 2: Channel & Message Creation & Posting (3 days)
I will begin to add API routes to serve JSON and begin building the app as a single page backbone application. The first step to be able to post messages and have messages belong to a channel or to a conversation between two people. By the end of this phase, users will be able to join or create channels and conversations and then post and read the messages that belong to those conversations.

### Phase 3: Files and formatted messages (2 days)
In this phase I will use third party libraries to improve both the displaying and creation of messages. I will allow messages to be formatted by using a Markdown editor for my MessageForm and I will need to make sure Markdown is escaped in the MessageShow. I will also use Filepicker to be able to upload files to channels and conversations.

### Phase 4: Search for Messages (2 days)
In this phase I will need to add search routes to the Message controller. On the backbone side, there will be a SearchResults composite view that has MessageShow subview. This view will look similar to the channel composite view.  

### Phase 5: Scrolling (2 days)
In this phase, I will need to make the feed act the way Slack's feed does. Messages start at the bottom and work their way up. If there aren't enough messages, the feed is aligned to the bottom of the page. Also a scroll up should fetch more messages with pagination that the user doesn't notice.

### Bonus Features
- [ ] infinite scroll
- [ ] OAuth in Facebook & Twitter
- [ ] conversation show in a single SQL query rather than 4
- [ ] searching fetches the context (the two messages before and after the
  message that contains the search phrase).
- [ ] User avatars
- [ ] Typeahead search bar
- [ ] mentions can be made without using @ and searching for the username in text

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
