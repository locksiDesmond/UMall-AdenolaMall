import { Component, useState, useEffect } from "react";
import { firebase } from "./../../Firebase/Firebase";
const Newdata = (category, subcategory, limit) => {
  const [data, setData] = useState(["loading"]);
  useEffect(() => {
    firebase
      .firestore()
      .collection(category)
      .orderBy("date")
      .limit(limit)
      .where("subcategory", "==", subcategory)
      .get()
      .then(querySnapshot => {
        const somedata = querySnapshot.docs.map(doc => ({
          doc: doc.id,
          ...doc.data()
        }));
        setData(somedata);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        setData("error");
      });
  }, [category, subcategory, limit]);
  return data;
};
export const CategoryData = (category, limit) => {
  const [times, setTimes] = useState(["loading"]);
  // const page = page;
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(category)
      .orderBy("date")
      .limit(limit)
      .onSnapshot(snapshots => {
        const somedati = snapshots.docs.map(doc => ({
          doc: doc.id,
          ...doc.data()
        }));
        setTimes(somedati);
      });
    return () => unsubscribe();
  });
  return times;
};
export const LandingPageData = (category, order, limit) => {
  const [times, setTimes] = useState(["loading"]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(category)
      .orderBy(order)
      .limit(limit)
      .onSnapshot(snapshots => {
        const somedati = snapshots.docs.map(doc => ({
          doc: doc.id,
          ...doc.data()
        }));
        setTimes(somedati);
      });
    return () => unsubscribe();
  }, [category, order, limit]);
  return times;
};
export const GetUserPosts = (category, order, limit, uid) => {
  const [times, setTimes] = useState(["loading"]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(category)
      .orderBy(order)
      .limit(limit)
      .where("uid", "==", uid)
      .onSnapshot(snapshots => {
        const somedati = snapshots.docs.map(doc => ({
          doc: doc.id,
          ...doc.data()
        }));
        setTimes(somedati);
      });
    return () => unsubscribe();
  }, [category, order, limit, uid]);
  return times;
};
export const Userdata = uid => {
  const [user, setUser] = useState(["loading"]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .get()
      .then(doc => {
        const data = doc.data();
        setUser(data);
      })
      .catch(() => {
        setUser("error");
      });
  }, [uid]);
  return user;
};
export const DeletePicture = name => {
  // const { category, subcategory, name, description } = user;
  // console.log(`${category}/${subcategory}/${name}/${description}${0}`);
  firebase
    .storage()
    .ref(`images/${name}`)
    .delete()
    .then(() => {
      console.log("picture  successful");
    })
    .catch(() => {
      console.log("error picture");
    });
};
export const DeleteData = (category, id, image) => {
  firebase
    .firestore()
    .collection(category)
    .doc(id)
    .delete()
    .then(() => {
      console.log("successful");
    })
    .catch(() => {
      console.log("error");
    });
};
export const SearchData = (category, search, limit = 10) => {
  const [data, setData] = useState(["loading"]);
  useEffect(() => {
    if (search.length > 3) {
      firebase
        .firestore()
        .collection(category)
        .where("name", ">=", search)
        .limit(limit)
        .get()
        .then(querySnapshot => {
          const somedata = querySnapshot.docs.map(doc => ({
            doc: doc.id,
            ...doc.data()
          }));
          setData(somedata);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
          setData("error");
        });
    }
  }, [category, search, limit]);
  return data.filter(
    item => item.name && item.name.toLowerCase().indexOf(search) !== -1
  );
};
export const RelatedData = (category, search, docid) => {
  const [data, setData] = useState(["loading"]);
  useEffect(() => {
    firebase
      .firestore()
      .collection(category)
      .where("name", ">=", search)
      .limit(5)
      .get()
      .then(querySnapshot => {
        const somedata = querySnapshot.docs.map(doc => ({
          doc: doc.id,
          ...doc.data()
        }));
        setData(somedata);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        setData("error");
      });
  }, [category, search]);
  return data.filter(item => item.doc && item.doc !== docid);
};
export const sec2time = timeInSeconds => {
  let pad = function(num, size) {
      return ("000" + num).slice(size * -1);
    },
    time = parseFloat(timeInSeconds).toFixed(3),
    days = Math.floor(time / 60 / 60 / 24),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);

  return (
    pad(days, 2) +
    ":" +
    pad(hours, 2) +
    ":" +
    pad(minutes, 2) +
    ":" +
    pad(seconds, 2)
  );
};
export const secondsToHms = d => {
  d = Number(d);
  let D = Math.floor(d / (3600 * 24));
  var h = Math.floor((d % (3600 * 24)) / 3600);
  var m = Math.floor((d % 3600) / 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
  var DDisplay = D > 0 ? D + (D === 1 ? "day " : " days ") : "";
  if (D >= 1) {
    return DDisplay + "ago";
  } else if (h >= 1) {
    return hDisplay + "ago";
  } else if (m >= 1) {
    return mDisplay + "ago";
  } else {
    return "now";
  }

  // return DDisplay + hDisplay + mDisplay;
};
export class UserDataClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      uid: props
    };
  }
  componentDidMount() {
    const { uid } = this.state;
    if (uid) {
      firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .get()
        .then(doc => {
          const data = doc.data();
          this.setState({ user: data });
        });
    }
  }
  setUid(uid) {
    this.setState({
      uid: uid
    });
  }
  getUser() {
    return this.state.user;
  }
}
export default Newdata;
