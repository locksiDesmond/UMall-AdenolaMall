import React, { useState, useEffect } from "react";
import { firebase } from "./../../Firebase/Firebase";
import Loading from "./../../SmallComponent/Loading";

const Newdata = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("Clothings")
      .onSnapshot(snapshot => {
        const times = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(times);
      });
  }, []);
  return data;
};

const Recent = () => {
  const freshdata = Newdata();
  const itemlike = freshdata.map(item => (
    <li key={item.id}> First {item.name}</li>
  ));
  return <ul>{!itemlike ? <Loading /> : itemlike}</ul>;
};
export default Recent;
