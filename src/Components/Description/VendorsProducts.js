import React from "react";
import RecentUploads from "./../UserProfile/RecentUploads";
import { OwnersDetails } from "./DescriptionBody";
class VendorsProducts extends React.Component {
  state = { show: false };
  render() {
    const { userdata, item, handlerefresh } = this.props;
    const user = {
      uid: userdata.doc
    };
    return (
      <React.Fragment>
        <div className="description--page  reverse">
          <div className="product--description">
            <h3>Available Products</h3>
            <RecentUploads handlerefresh={handlerefresh} user={user} />
          </div>
          <div className="description--aside">
            <OwnersDetails userdata={userdata} item={item} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default VendorsProducts;
