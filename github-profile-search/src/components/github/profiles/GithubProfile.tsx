import React from "react";
import { IProfile } from "../models/IProfile";
import GithubProfileCard from "./GithubProfileCard";
import GithubProfileDetails from "./GithubProfileDetails";

interface IProps {
    profile: IProfile;
}

interface IState { }

class GithubProfile extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-3">
                        <GithubProfileCard profile={this.props.profile} />
                    </div>
                    <div className="col-md-9">
                        <GithubProfileDetails profile={this.props.profile} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default GithubProfile;
