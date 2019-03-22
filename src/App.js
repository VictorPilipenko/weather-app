import React, { Component } from "react";
import "./App.css";
import WeatherDisplay from './WeatherDisplay'
import logo from './Logo_Final-01.png'

class App extends Component {
    state = {

        value: `google.com\ntrello.com\ngithub.com\nstackoverflow.com\nhabr.com`,
        arrayOfDomainNames: [],

        isCreateChoice: 'visible',
        isCheckedCreateChoice: true,

        isUpdateChoice: 'visible',
        isCheckedUpdateChoice: true,

        isExpiryChoice: 'visible',
        isCheckedExpiryChoice: true,

        //Registrar name
        isRegistrarChoice: 'visible',
        isCheckedRegistrarChoice: true,
    }

    handleChange = e => this.setState({
        value: e.target.value
    });

    handleClick = e => {
        e.preventDefault();
        try {
            const arrayOfLines = this.state.value.split('\n');
            let clearArrayOfLines = arrayOfLines.filter(element => element !== "");
            this.setState({
                arrayOfDomainNames: clearArrayOfLines
            });
        }
        catch (e) {
            console.log(e)
        }
    }

    toggle = name => {
        this.state[`is${name}Choice`] === 'visible' ?
            this.setState({
                [`is${name}Choice`]: 'hidden',
            })
            :
            this.setState({
                [`is${name}Choice`]: 'visible',
            })

        this.setState({
            [`isChecked${name}Choice`]: !this.state[`isChecked${name}Choice`],
        });
    };

    // state = {
    //     shown: true,
    // };


    // toggleShown() {
    //     this.setState({
    //         shown: !this.state.shown
    //     });
    // }


    render() {
        // let shown = {
        //     display: this.state.shown ? "block" : "none"
        // };

        // let hidden = {
        //     display: this.state.shown ? "none" : "block"
        // }

        const Create = "Create";
        const Update = "Update";
        const Expiry = "Expiry";
        const Registrar = "Registrar";


        return (
            <div className="grid-container">
                <div className="header">
                    <div className="header-flex-items-first">
                       
                        {/* три пробела перед и после*/}
                        <span className="legendForTextarea">{'\u00A0'}{'\u00A0'}{'\u00A0'}Add domains{'\u00A0'}{'\u00A0'}{'\u00A0'}</span>
                        <textarea
                            value={this.state.value}
                            placeholder="...one per line"
                            onChange={this.handleChange}
                            cols={50}
                            rows={5}
                            className="textArea"
                        />
                        <div className="buttonWrapper">
                            <p className="countCities">{this.state.arrayOfDomainNames.length} domains added</p>
                            <button className="buttonGetDomains" onClick={this.handleClick}>Push</button>
                        </div>

                         <img className="logo" src={logo} alt="logo" />

                    </div>

                    <div className='header-flex-items-second'>

                        

                    </div>
                </div>
                <div className="content">
                    <WeatherDisplay
                        arrayOfDomainNames={this.state.arrayOfDomainNames}

                        isCreateChoice={this.state.isCreateChoice}
                        isUpdateChoice={this.state.isUpdateChoice}
                        isExpiryChoice={this.state.isExpiryChoice}
                        isRegistrarChoice={this.state.isRegistrarChoice}
                    />
                </div>
                <div className="menu">
                    <div className="grid-container-menu">
                        {/* <div class="banner">
                            <div class="animated">
                                <div class="text1">Только в этом месяце</div>
                                <div class="text2">Скидки по 20%</div>
                            </div>
                        </div> */}

                       <fieldset className="fieldsetApp">
                            <legend style={{color: "white"}}>Technical metrics</legend>

                            <input type="checkbox" id="create" name="create"
                                checked={this.state.isCheckedCreateChoice}
                                onClick={() => this.toggle(Create)}
                                onChange={()=>{}}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="create">Create</label>
                            <br />


                            <input type="checkbox" id="update" name="update"
                                checked={this.state.isCheckedUpdateChoice}
                                onClick={() => this.toggle(Update)}
                                onChange={()=>{}}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="update">Update</label>
                            <br />


                            <input type="checkbox" id="expiry" name="expiry"
                                checked={this.state.isCheckedExpiryChoice}
                                onClick={() => this.toggle(Expiry)}
                                onChange={()=>{}}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="expiry">Expiry</label>
                            <br />

                            <input type="checkbox" id="registrar" name="registrar"
                                checked={this.state.isCheckedRegistrarChoice}
                                onClick={() => this.toggle(Registrar)}
                                onChange={()=>{}}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="registrar">Registrar</label>
                            <br />
                        </fieldset>



                    </div>
                </div>
                <div className="footer">
                </div>
            </div>
        );
    }
}

export default App;