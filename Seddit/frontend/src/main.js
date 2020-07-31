/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.

window.token = '';

function loginButton() {
  let loginButton = document.createElement('button');
  loginButton.setAttribute('data-id-login', '');
  loginButton.setAttribute('class', 'button button-primary');
  loginButton.innerText = 'Log In';

  loginButton.addEventListener("click", function(event){
    let loginForm = document.getElementById('loginForm');
    loginForm.removeAttribute('hidden');
  });
  return loginButton;
}

function loginButtonPopover() {
  let loginButton = document.createElement('button');
  loginButton.setAttribute('data-id-login', '');
  loginButton.setAttribute('class', 'button button-secondary');
  loginButton.innerText = 'Log In';
  document.getElementById('data-id-login').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display = 'flex';
  });
  document.querySelector('.close').addEventListener('click', function () {
    document.querySelector('.bg-modal').style.display = "none";
  });
  
  return loginButton;
}

function signUpButton() {
  let signUpButton = document.createElement('button');
  signUpButton.setAttribute('class', 'button button-secondary');
  signUpButton.setAttribute('data-id-signup', '');
  signUpButton.innerText = 'Sign Up';
  signUpButton.addEventListener("click", function(event){
    let signUpForm = document.getElementById('registrationForm');
    signUpForm.removeAttribute('hidden');
  });

  return signUpButton;
}

function setupHeaders(){
  let parentElement = document.getElementById('root');

  let header = document.createElement('header');
  header.setAttribute('class', 'banner');
  header.setAttribute('id', 'nav');

  let logo = document.createElement('h1');
  logo.setAttribute('id', 'logo');
  logo.setAttribute('class', 'flex-center');
  logo.innerText = 'Seddit';

  header.appendChild(logo);

  let nav = document.createElement('ul');
  nav.setAttribute('class', 'nav');

  let navItem = document.createElement('li');
  navItem.setAttribute('class', 'nav-item');

  let loginNav = navItem;
  let login = loginButton();
  loginNav.appendChild(login);

  let signUpNav = navItem;
  let signup = signUpButton();
  signUpNav.appendChild(signup);

  nav.appendChild(login);
  nav.appendChild(signup);
  header.appendChild(nav);
  parentElement.appendChild(header);
}

function loginForm() {  
  let parentElement = document.getElementById('root');

  let loginForm = document.createElement('form');
  loginForm.setAttribute('id', 'loginForm')
  loginForm.setAttribute("hidden", true);

  let username = document.createElement('input');
  username.setAttribute('id', 'user');
  username.setAttribute('type', 'text');
  username.setAttribute('value', '');
  username.setAttribute('placeholder', 'Username');
  
  let password = document.createElement('input');
  password.setAttribute('id', 'password');
  password.setAttribute('type', 'password');
  password.setAttribute('value', '');
  password.setAttribute('placeholder', 'Password');
  
  let submit = document.createElement('button');
  submit.setAttribute('id', 'login-button');
  submit.innerText = "Submit";

  loginForm.appendChild(username);
  loginForm.appendChild(password);
  loginForm.appendChild(submit);

  parentElement.appendChild(loginForm);

  document.querySelector("#login-button")
  .addEventListener("click", function(event){
    event.preventDefault();
    let userInputName = document.getElementById('user').value
    let userInputPassword = document.getElementById('password').value

    let validateLogin = login(userInputName, userInputPassword);
    return;
  }); 
}

function login(username, password) {

  return fetch('http://127.0.0.1:5000/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
    }),
  }).then(res => {
    if( res.status != 200 ) {
      if( res.status == 400 ) {
        alert('Please enter a username and password');
      }
      else if( res.status == 403 ) {
        alert('Incorrect username or password');
      }
      else {
        alert('Login error');
      }
    }
    else {
      res.json()
      .then( data => {
        window.token = data.token
      });
      alert('Login successful');
      resetOnLogin();
    }
  })
}

function resetOnLogin(){
  let loginForm = document.getElementById('loginForm');
  loginForm.setAttribute('hidden', true);
  //remove the feed
  let feedBox = document.getElementById('feed');
  feedBox.parentElement.removeChild(feedBox);
  //remove the footer
  let footerOne = document.getElementsByTagName('footer')
  footerOne[0].parentNode.removeChild(footerOne[0]);
  // make a new main (look at feed())
  feed();
  // make a new footer (look at footer())
  footer();
}

function registrationForm() {
  
  let parentElement = document.getElementById('root');

  let registrationForm = document.createElement('form');
  registrationForm.setAttribute('id', 'registrationForm')
  registrationForm.setAttribute('hidden', true);

  let username = document.createElement('input');
  username.setAttribute('id', 'userRego');
  username.setAttribute('type', 'text');
  username.setAttribute('value', '');
  username.setAttribute('placeholder', 'Username');
  
  let passwordOne = document.createElement('input');
  passwordOne.setAttribute('id', 'passwordOne');
  passwordOne.setAttribute('type', 'password');
  passwordOne.setAttribute('value', '');
  passwordOne.setAttribute('placeholder', 'Password');
  
  let passwordTwo = document.createElement('input');
  passwordTwo.setAttribute('id', 'passwordTwo');
  passwordTwo.setAttribute('type', 'password');
  passwordTwo.setAttribute('value', '');
  passwordTwo.setAttribute('placeholder', 'Enter password again');

  let email = document.createElement('input');
  email.setAttribute('id', 'email');
  email.setAttribute('type', 'text');
  email.setAttribute('value', '');
  email.setAttribute('placeholder', 'Email');

  let name = document.createElement('input');
  name.setAttribute('id', 'name');
  name.setAttribute('type','text');
  name.setAttribute('value', '');
  name.setAttribute('placeholder', 'Name ');

  let submit = document.createElement('button');
  submit.innerText = 'Submit';

  registrationForm.appendChild(username);
  registrationForm.appendChild(passwordOne);
  registrationForm.appendChild(passwordTwo);
  registrationForm.appendChild(name);
  registrationForm.appendChild(email);
  registrationForm.appendChild(submit);
  parentElement.appendChild(registrationForm);

  document.querySelector("#registrationForm")
  .addEventListener("submit", function(event){
    event.preventDefault();
    let userInputName = document.getElementById('userRego').value
    let userInputPasswordOne = document.getElementById('passwordOne').value
    let userInputPasswordTwo = document.getElementById('passwordTwo').value
    event.preventDefault();
    if (userInputName === ''
        || userInputPasswordOne === ''
        || userInputPasswordTwo === '') {
        alert('Please fill all fields');
    } else if (userInputPasswordOne !== userInputPasswordTwo) {
        alert('Passwords dont match');
    } else {
        alert('Success!');
    }
    let usernameInput = document.getElementById('userRego').value;
    let passwordOneInput = document.getElementById('passwordOne').value;
    let nameInput = document.getElementById('name').value;
    let emailInput = document.getElementById('email').value;

    let validateRegistration = signUp(usernameInput, passwordOneInput, nameInput, emailInput);
    return;
  }); 
}

function signUp(username, password, name, email) {
  return fetch('http://127.0.0.1:5000/auth/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, 
        password,
        name,
        email,
      }),
    }).then(res => {
      if( res.status != 200) {
        if( res.status == 400 ) {
          alert('Please enter a username and password');
        }
        else if( res.status == 409 ) {
          alert('Username taken');
        }
        else {
          alert('Signup error');
        }
      }
      else {
        res.json()
        .then( data => {
          window.token = data.token
        });
        alert('Signup successful');
      }
    })
}

function feedHeader() {
  let feedHeader = document.createElement('div');
  let postButton = document.createElement('button');
  let titleHeader = document.createElement('h3');
  feedHeader.setAttribute('class', 'feed-header');
  titleHeader.setAttribute('class', 'feed-title');
  titleHeader.setAttribute('class', 'alt-title');
  titleHeader.innerText = 'Popular posts';
  postButton.setAttribute('class', 'button button-secondary');
  postButton.innerText = 'Post';
  feedHeader.appendChild(titleHeader);
  feedHeader.appendChild(postButton);
  return feedHeader;
}

function getAuthor (postData) {
  let user = document.createElement('p');
  user.setAttribute('data-id-author', '');
  user.setAttribute('class', 'post-author');
  user.innerText = `Posted by @${postData.author}`;
  return user;
}

function getTitle (postData) {
  let title = document.createElement('h4');
  title.setAttribute('data-id-title', '');
  title.setAttribute('class', 'post-title alt-text');
  title.innerText = postData.title;
  return title;
}

function getUpvotes (postData) {
  let upvotes = document.createElement('div');
  upvotes.setAttribute('data-id-upvotes', '');
  upvotes.setAttribute('class','vote');
  let upvotesCount = postData.meta.upvotes.length;
  upvotes.innerText = `${upvotesCount}`;
  return upvotes; 
}

function getTime (postData) {
  let unix_timestamp = postData.meta.published;
  let date = new Date(unix_timestamp*1000);
  let dateStamp = document.createElement('p');
  dateStamp.innerText = `Posted at ${date.getHours()}:${date.getMinutes()} on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  return dateStamp;
}

function getText (postData) {
  let text = document.createElement('p');
  text.innerText = postData.text;
  return text;
}

function getCommentCount (postData) {
  let commentsCount = document.createElement('p');
  let count = postData.comments.length;
  commentsCount.innerText = `${count} comments`;
  return commentsCount;

}

function getSubseddit (postData) {
  let subseddit = document.createElement('p');
  subseddit.innerText = `/s/${postData.meta.subseddit}`;
  return subseddit;
}

// function showUpvotes(postData) {
//   let upvotes = document.createElement('div');
//   for(let key in postData.meta.upvotes){
//     let newUpvote = document.createElement('p');

//   } 
// }

// function showComments(postData){
//   let commentList = document.createElement('div');
//   for(let key in postData.comments) {
//     let newComment = createComment(postData.comments[key]);
//     commentList.appendChild(newComment);
//   }
//   return commentList;
// } 
// function createComment(postData) {
//   let author = getAuthor(postData);
//   let comment = getText(postData);
//   let time = getTime(postData);
//   let commentElement = document.createElement('div');
//   commentElement.appendChild(author);
//   commentElement.appendChild(comment);
//   commentElement.appendChild(time);
//   return commentElement;
// }

function getThumbnail(postData) {
  let image = document.createElement('img');
  image.setAttribute('src', 'data:image/png;base64,' + postData.thumbnail);
  return image;
};

function addPost(postData) {

  let author = getAuthor(postData.meta);
  let dateStamp = getTime(postData);
  let title = getTitle(postData);
  let upvotes = getUpvotes(postData);
  let text = getText(postData);
  let comments = getCommentCount(postData);
  let subseddit = getSubseddit(postData);
  let post = document.createElement('li');

  post.setAttribute('class', 'post');
  post.setAttribute('data-id-post', '');
  post.appendChild(upvotes);

  let content = document.createElement('div');
  content.setAttribute('class', 'content')
  if(postData.thumbnail != null){
    let thumbnail = getThumbnail(postData);
    content.appendChild(thumbnail)
  }
  content.appendChild(title);
  content.appendChild(author);
  content.appendChild(comments);

  content.appendChild(dateStamp);
  content.appendChild(comments);
  content.appendChild(text);

  post.appendChild(content);
  
  return post;

}

function feed() {
  let parentElement = document.getElementById('root');

  let feedBox = document.createElement('ul');
  feedBox.setAttribute('id', 'feed')
  feedBox.setAttribute('data-id-feed', '');
  feedBox.setAttribute('class','feed');

  let feedHead = feedHeader();
  feedBox.appendChild(feedHead);

  getFeed( feedBox );

  let main = document.createElement('main');
  main.setAttribute('role', 'main');

  main.appendChild(feedBox);
  parentElement.appendChild(main);
}

function getFeed( pageElement ){

  let loggedInURL = 'http://127.0.0.1:5000/user/feed'
  let publicURL = 'http://127.0.0.1:5000/post/public'
  let url = publicURL;

  if (window.token != '') {
    url = loggedInURL;
  }

  Promise.all([
    getJSON(url, {headers: {'Authorization': window.token} })
  ])
  .then((feed) => {
    feed = sortFeed(feed[0].posts);

    for (let key in feed) {
      let newPost = addPost(feed[key]);
      pageElement.appendChild(newPost);
    };
  });
}

function sortFeed(feed) {
  return feed.map(post => {
    return post;
  }).sort(
    (a, b) => b.meta.published - a.meta.published );
}

function getJSON(path, options = {}) {
  if (isEmpty(options)) {
    return fetch(path).then(res => res.json());
  }
  return fetch(path, options).then(res => res.json());
}

function isEmpty(object) {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function footer() {
  let parentElement = document.getElementById('root');
  let footer = document.createElement('footer');
  let p = document.createElement('p');
  p.innerText = 'Jocelyn\'s Seddit';
  footer.appendChild(p);
  parentElement.appendChild(footer);
}

function initApp(apiUrl) {

  setupHeaders();
  loginForm();
  registrationForm();
  feed();
  footer();

}

export default initApp;