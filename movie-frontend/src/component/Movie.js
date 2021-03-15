import React, { Component } from 'react'
import axios from 'axios'

export class Movie extends Component {
    state = {
        movieInput: "",
        movieList: [],
        isToggle: false,
        updatedInput: "",
    };

    componentDidMount = async () => {
        try {
            let allMovie = await axios.get(
                "http://localhost:3001/movie/get-all-movie"
            );
            this.setState({
                movieList: allMovie.data.data,
            })
        } catch (e) {
            console.log(e)
        }
    };

    handleMovieInputOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleMovieSubmit = async () => {
        try {
            let createdMovie = await axios.post(
                "http://localhost:3001/movie/create-movie",
                { movie: this.state.movieInput }
            );
            let newMovieList = [
                ...this.state.movieList,
                createdMovie.data.data,
            ];
            this.setState({
                movieList: newMovieList,
            })
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteByParamsID = async (id) => {
        try {
            let deletedMovie = await axios.delete(
                `http://localhost:3001/movie/delete-by-id/${id}`
            );
            let newMovieList = this.state.movieList.filter(
                (item) => item._id !== deletedMovie.data.data._id
            );
            this.setState({
                movieList: newMovieList,
            })
        } catch (e) {
            console.log(e)
        }
    };

    updateOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleUpdateByID = async (item) => {
        this.setState((prevState) => {
            return {
                isToggle: !prevState.isToggle,
                updatedInput: item.movie,
            }
        });

        try {
            let updatedMovie = await axios.put(
                `http://localhost:3001/movie/update-by-id/${item._id}`,
                { movie: this.state.updatedInput })
            let newMovieList = this.state.movieList.map((item) => {
                if(item._id === updatedMovie.data.data._id) {
                    item.movie = updatedMovie.data.data.movie;
                }
                return item;
            })
            this.setState({
                movieList: newMovieList,
            })
        } catch(e) {
            console.log(e)
        }
    }

render() {
    return (
        <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ marginTop: 20 }}>
                <input
                    type="text"
                    name="movieInput"
                    value={this.state.movieInput}
                    onChange={this.handleMovieInputOnChange}
                />
            </div>
            <br />
            <button style={{ margin: 10 }} onClick={this.handleMovieSubmit}>
                Submit
                    </button>
            <br />
            {this.state.movieList.map((item) => {
                return (
                    <div key={item._id}>
                        {this.state.isToggle ?
                            (<input
                                type="text"
                                name="updatedInput"
                                value={this.state.updatedInput}
                                onChange={this.updatedOnChange}
                            />)
                            :
                            (<span style={{ margin: "10px" }}>{item.movie}</span>)
                        }
                        <button
                            onClick={() => this.handleUpdateByID(item)}
                            style={{ margin: "10px" }}
                            className="btn btn-primary"
                        >
                            Update
                            </button>

                        <button
                            onClick={() => this.handleDeleteByParamsID(item._id)}
                            style={{ margin: "10px" }}
                            className="btn btn-warning"
                        >
                            Delete
                            </button>
                    </div>
                )
            })}
        </div>
    )
}
}

export default Movie;