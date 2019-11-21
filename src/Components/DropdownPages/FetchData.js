import { useState, useEffect } from "react";
import { firebase } from "./../../Firebase/Firebase";
const Newdata = (category, subcategory) => {
  const [data, setData] = useState(["loading"]);
  useEffect(() => {
    firebase
      .firestore()
      .collection(category)
      .where("subCategory", "==", subcategory)
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
  const [times, setTimes] = useState([]);
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
export default Newdata;
