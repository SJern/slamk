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
[channel]: ./docs/wireframes/chat.png

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

### Phase 1: User Front-end Authentication (~2 day)
I will implement user authentication in Rails based on the practices learned at App Academy. By the end of this phase, users will be able to log in to create or join channels. They will also be able to log in as guests. The most important part of this phase will be pushing the app to Heroku and ensuring that everything works before moving on to phase 2.
- [ ] Splash Component
- [ ] Rails User JSON API
- [ ] Front-end Auth
- [ ] Guest Demo Login
- [ ] CSS styling

### Phase 2: Live-Chat (3 days)
I will begin to add API routes to serve JSON and begin building the app as a single-page application. The first step is to implement live chats by using Pusher/WebSockets and have messages belong to different rooms. Some of these rooms will be channels and some will be direct-message rooms. By the end of this phase, users will be able to send and receive messages in real-time.
- [ ] Use Pusher to implement live chats
- [ ] Style live-chat/Room component

### Phase 3: Navigation and Room Creation (2 days)
In this phase I will add the Navigation component so that users can join or create channels and can create direct-message rooms. They will be able to post and read the messages in rooms that they are members of. By the end of this phase, users will be able to switch between channels and direct-message rooms. They will also be able to log out from there.
- [ ] Create Navigation component
- [ ] Style Navigation component
- [ ] Add Menu component to the top of the Navigation component

### Phase 4: Seed Data and Final Styling (1 days)
In this phase I will seed adequate amount of data to demonstrate the site's features. I will spend time to work on CSS styling to give the site a professional look.

### Phase 5: Production README and Bonuses (2 day)
I will replace this README with a production README. I will also give users the ability to edit their profile, to add reactions and files to messages in chat rooms they are members of.
- [ ] Production README
- [ ] Show and Edit User Profile
- [ ] Add Reactions to messages
- [ ] Attach files to messages

### Bonus Features
- [ ] search-bar/auto-completion for users and rooms
- [ ] file uploads
- [ ] reactions
- [ ] infinite scroll
- [ ] User avatars

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
