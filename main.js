var myUser = {}

const userImages = document.getElementsByClassName("user-img")
const userNames = document.getElementsByClassName("user-name")
const postsContainer = document.getElementById("posts")

var init = function(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // userImages.map( img => img.src = photoURL)
      for (let index = 0; index < userImages.length; index++) {
        userImages[index].src = user.photoURL
      }
      for (let index = 0; index < userNames.length; index++) {
        userNames[index].innerHTML = user.displayName
      }

      myUser = user

    } else {      
      // No user is signed in.
      console.log("redirect");
      window.location.replace("login.html");
    }
  });
}
  
init();

const htmlPost = (post) => {

  function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
  }

  const date1 = new Date();
  const date2 = post.date;
  const diffTime = Math.abs(date2 - date1);
  const minutes = Math.ceil(diffTime/( 1000*60 ))
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let postDate = "";
  // if( minutes < 1 ){ // less than a minute
  //   postDate = " a moment"
  // }else if( minutes == 1 ) { // a minute
  //   postDate = "1 minute"
  // }else if( minutes > 1 ) { // more than a minute
  //   postDate = `${minutes} minutes`
  // }else if( ((minutes / 60)) == 1 ) { // an hour
  //   postDate = "1 hour"
  // }else if( (minutes / 60) > 1 ) { // more than an hour
  //   postDate = `${minutes / 60} hours`
  // }else if( (minutes / (60 * 24) ) == 1 ) { // a day
  //   postDate = "1 day"
  // }else if( (minutes / (60 * 24) ) > 1 ) { // more than a day
  //   postDate = `${(minutes / (60 * 24) )} days`
  // }

  if( minutes < 1 ){ // less than a minute
    postDate = " a moment"
  }else if( Math.round(minutes / (60 * 24) ) > 1 ) { // more than a day
    postDate = `${Math.round(minutes / (60 * 24) )} days`
  }else if( Math.round(minutes / (60 * 24) ) == 1 ) { // a day
    postDate = "1 day"
  }else if( Math.round(minutes / 60) > 1 ) { // more than an hour
    postDate = `${Math.round(minutes / 60)} hours`
  }else if( Math.round(minutes / 60) == 1 ) { // an hour
    postDate = "1 hour"
  }else if( minutes > 1 ) { // more than a minute
    postDate = `${Math.round(minutes)} minutes`
  }else if( minutes == 1 ) { // a minute
    postDate = "1 minute"
  }


  let stringPost = `
    <div class="post">
      <div class="post--user">
        <img src="${post.photo}" alt="">
        <div class="post--user--name-time">
          <h4>${post.name}</h4>
          <p>${postDate} ago · 🌎</p>
        </div>
      </div>
      <p class="post--details" dir="auto">${post.post}</p>
      <div class="post--actions">
        <div class="post--action">
          <i class="far fa-thumbs-up"></i>
          <h4>Like</h4>
        </div>
        <div class="post--action">
          <i class="far fa-comment-alt"></i>
          <h4>Comment</h4>
        </div>
        <div class="post--action">
          <i class="fas fa-share"></i>
          <h4>Share</h4>
        </div>
      </div>
    </div>
  `
  let res = createElementFromHTML(stringPost)
  return(res)
}

const createPost = (e) => {
  // e.preventDefault()
  const db = firebase.firestore();
  const collectionRef = db.collection("posts");
  let postDetails = document.getElementById("post-details");
  // console.log(postDetails.value);
  let post = {photo:myUser.photoURL, post:postDetails.value, name:myUser.displayName, date: new Date()}
  // console.log(post);
  collectionRef.add({photo:myUser.photoURL, post:postDetails.value, name:myUser.displayName, date: new Date()});
  postDetails.value = ""
  
  postsContainer.prepend(htmlPost(post))
}

// it must return array why return promice
// const getPosts = async (collection) => {
//   let data = []
//   const db = firebase.firestore();
//   await db.collection(collection)
//       .orderBy("date", "asc")
//       .onSnapshot( snap => {
//         snap.forEach( doc => {
//           newPosts.push({...doc.data(), id: doc.id })
//           data.push({...doc.data(), id: doc.id })
//         });
//       })
//   return data
// }

const getPosts = async () => {
  const snapshot = await firebase.firestore().collection('posts').orderBy("date", "asc").get()
  return snapshot.docs.map(doc => doc.data());
}

window.onload = () => {
  console.log("load");
  getPosts().then( posts => posts.map( e => postsContainer.prepend(htmlPost(e)) ))
}

