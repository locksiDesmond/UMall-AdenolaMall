import { useState, useEffect } from "react";
import { firebase } from "./../../Firebase/Firebase";
const Newdata = (category, subcategory) => {
  const [data, setData] = useState([]);
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
  });
  return data;
};
export default Newdata;
