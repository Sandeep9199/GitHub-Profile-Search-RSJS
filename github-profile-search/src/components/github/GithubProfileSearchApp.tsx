import React from "react";
import axios from "axios";
import { GithubCred } from "./credentials/GithubCred"
import { IProfile } from "./models/IProfile";
import { IRepository } from "./models/IRepository"; 
import GithubProfile from "./profiles/GithubProfile";
import GithubRepos from "./repos/GithubRepos"; 

interface IProps { }

interface IState {
    githubUserName: string;
    profile: IProfile;
    repos: IRepository[];
}

class GithubProfileSearchApp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            githubUserName: "",
            profile: {} as IProfile,
            repos: [] as IRepository[],
        };
    }

    changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            githubUserName: event.target.value,
        });
    };

    submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.searchProfile(this.state.githubUserName);
        this.searchRepos(this.state.githubUserName);
    };

    // search Profile of a user
    searchProfile = (githubUser: string) => {
        let dataURL: string = `https://api.github.com/users/${githubUser}?Client_ID=${GithubCred.Client_ID}&Client_Secret=${GithubCred.Client_Secret}`;
        axios
            .get(dataURL)
            .then((response) => {
                this.setState({
                    ...this.state,
                    profile: response.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // search Repos of a user
    searchRepos = (githubUser: string) => {
        let dataURL: string = `https://api.github.com/users/${githubUser}/repos?Client_ID=${GithubCred.Client_ID}&Client_Secret=${GithubCred.Client_Secret}`;
        axios
            .get(dataURL)
            .then((response) => {
                this.setState({
                    ...this.state,
                    repos: response.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <React.Fragment>
                <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="h3 text-primary">Github Search App</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Doloremque dolorum minus obcaecati odio porro quae vero
                                    voluptas voluptatem. Dignissimos eum ex fugit non, quidem
                                    totam. Dignissimos molestiae pariatur sit tenetur.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <form onSubmit={this.submitSearch}>
                                    <div className="row no-gutters">
                                        <div className="col">
                                            <div className="form-group">
                                                <input
                                                    value={this.state.githubUserName}
                                                    onChange={this.changeInput}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Github Username"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div>
                                                <input
                                                    type="submit"
                                                    className="btn btn-primary btn-sm"
                                                    value="Search"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {Object.keys(this.state.profile).length > 0 && (
                                    <GithubProfile profile={this.state.profile} />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {this.state.repos.length > 0 && (
                                    <GithubRepos repos={this.state.repos} />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default GithubProfileSearchApp;
