import { Component, useState, useEffect } from "react";
import { firebase } from "./../../Firebase/Firebase";
const Newdata = (category, subcategory) => {
  const [data, setData] = useState(["loading"]);
  useEffect(() => {
    firebase
      .firestore()
      .collection(category)
      .where("subcategory", "==", subcategory)
      .get()
      .then(querySnapshot => {
        const somedata = querySnapshot.docs.map(doc => doc.data());
        setData(somedata);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        setData("error");
      });
  }, [category, subcategory]);
  return data;
};
export const CategoryData = category => {
  const [times, setTimes] = useState(["loading"]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(category)
      .onSnapshot(snapshots => {
        const somedati = snapshots.docs.map(doc => doc.data());
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
        const somedati = snapshots.docs.map(doc => doc.data());
        setTimes(somedati);
      });
    return () => unsubscribe();
  }, [category, order, limit]);
  return times;
};
export const Userdata = uid => {
  const [user, setUsers] = useState(["loading"]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .get()
      .then(doc => {
        const data = doc.data();
        setUsers(data);
      });
  });
  return user;
};

export const SearchData = (category, search) => {
  const [data, setData] = useState(["loading"]);
  useEffect(() => {
    firebase
      .firestore()
      .collection(category)
      .where("name", ">=", search)
      .get()
      .then(querySnapshot => {
        const somedata = querySnapshot.docs.map(doc => doc.data());
        setData(somedata);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        setData("error");
      });
  }, [category, search]);
  return data.filter(item => item.name && item.name.indexOf(search) !== -1);
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
