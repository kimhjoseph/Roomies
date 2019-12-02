import React from "react";
const axios = require("axios");

class ReactUploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      user: "",
      img_id: ""
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.submitImage = this.submitImage.bind(this);
    this.check = this.check.bind(this);


   
  }


  componentDidMount() {
    axios
      .get("http://localhost:4000/user/get_current_user")
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    console.log(this.state.user);
  }
  
  check() {
    const info = this.state;
    console.log(info);
    document
      .getElementById("img")
      .setAttribute("src", "http://localhost:4000/start/" + this.state.user.picture);


    // axios.post("http://localhost:4000/user/add_image", info).then(response => {
    //   console.log("Picture added to user!");
    //   console.log(response);
    // });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("/upload", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  }

  async submitImage(e) {
    e.preventDefault();
    const file = document.getElementById("inputGroupFile01").files;
    const formData = new FormData();

    formData.append("img", file[0]);

    await axios
      .post("http://localhost:4000/upload", formData)
      .then(response => {
        console.log("The file successfully uploaded");
        console.log(response.data.id);
        this.setState({
          img_id: response.data.id
        });
      });
    
    document
      .getElementById("img")
      .setAttribute("src", "http://localhost:4000/upload/" + file[0].name);

  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Hi {this.state.user.first_name}</h1>
          <p className="lead">
            This is a simple application to upload and retrieve images from a
            database
          </p>
          <hr className="my-4" />
        </div>
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
              Choose file
            </label>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.submitImage}
        >
          Upload
        </button>
        <button type="button" className="btn btn-primary" onClick={this.check}>
          Check
        </button>
        <img
          id="img"
          style={{
            display: "block",
            width: "100%",
            height: "100%"
          }}
        ></img>
      </div>
    );
  }
}

export default ReactUploadImage;
