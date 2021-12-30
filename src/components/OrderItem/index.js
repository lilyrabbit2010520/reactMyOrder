import React, { Component } from "react";
import "./style.css";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      stars: this.props.adata.stars || 0,
      comment: this.props.adata.comment || "",
    };
  }
  render() {
    const { shop, product, price, picture, ifCommented } = this.props.adata;
    return (
      <div className="orderItem">
        <div className="orderItem__picContainer">
          <img className="orderItem__pic" src={picture} />
        </div>
        <div className="orderItem__content">
          <div className="orderItem__product">{product}</div>
          <div className="ordrItem__shop">{shop}</div>
        </div>
        <div className="orderItem__detail">
          <div className="orderItem__price">{price}</div>
          <div>
            {ifCommented ? (
              <button
                className="orderItem__btn
                  orderItem__btn--grey"
              >
                Commented
              </button>
            ) : (
              <button
                className="orderItem__btn
                orderItem__btn--red"
                onClick={this.handleOpenEditArea}
              >
                Comments
              </button>
            )}
          </div>
        </div>
        {this.state.editing ? this.renderEditArea() : null}
      </div>
    );
  }
  renderEditArea() {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          onChange={this.handleCommentChange}
          value={this.state.comment}
          className="orderItem__comment"
        />
        {this.renderStars()}
        <button
          className="orderItem__btn orderItem__btn--red"
          onClick={this.handleSubmitComment}
        >
          Submit
        </button>
        <button
          className="orderItem__btn orderItem__btn--grey"
          onClick={this.handleCancelComment}
        >
          Cancel
        </button>
      </div>
    );
  }

  renderStars() {
    const { stars } = this.state;
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          const lightClass = stars >= item ? "orderItem__star--light" : "";
          return (
            <span
              className={"orderItem__star " + lightClass}

              key={index}
              onClick={this.handleClikcStars.bind(this, item)}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }
  handleOpenEditArea = () => {
    this.setState({
      editing: true,
    });
  };

  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handleClikcStars = (stars) => {
    this.setState({
      stars: stars
    });
  };
  handleCancelComment = () => {
    this.setState({
      editing: false,
      stars: this.props.adata.stars || 0,
      comment: this.props.adata.comment || "",
    });
  };

  handleSubmitComment = () => {
    const { id } = this.props.adata;
    const { comment, stars } = this.state;

    this.setState({
      editing: false,
    });
    this.props.onSubmit(id, comment, stars);
  };
}

export default OrderItem;
