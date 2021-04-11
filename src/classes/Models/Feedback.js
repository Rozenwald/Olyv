class Feedback {
  constructor(response) {
    this.id = response._id;
    this.date = response.updateDate;
    this.rating = response.response;
    this.comment = response.comment;
    this.from = response.from;
    this.to = response.to;
    this.idOrder = response.idOrder;
    this.order = response.order;

    this.isAwait = this.rating === 0;
    this.isCompleted = !this.isAwait;
  }
}

export default Feedback;
