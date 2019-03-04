import React, { Component } from "react";
import "./App.css";
import WeatherDisplay from './WeatherDisplay'

const Domains = [
    { name: "Zaporizhzhya", lat: "47.82", lon: "35.18" },
    { name: "Zaporizhzhya", lat: "47.82", lon: "35.18" },
    { name: "Zaporizhzhya", lat: "47.82", lon: "35.18" },
    { name: "Zaporizhzhya", lat: "47.82", lon: "35.18" },
    { name: "Zaporizhzhya", lat: "47.82", lon: "35.18" },
    { name: "Zaporizhzhya", lat: "47.82", lon: "35.18" },
    { name: "Zaporizhzhya", lat: "47.82", lon: "35.18" },
    { name: "Zaporizhzhya", lat: "47.82", lon: "35.18" },
    { name: "Zaporizhzhya", lat: "47.82", lon: "35.18" },
    { name: "Zaporizhzhya", lat: "47.82", lon: "35.18" },
];

class App extends Component {
    state = {
        activePlace: 0
    }

    render() {
        return (
            <div class="grid-container">
                <div class="header">
                    <nav class="header-flex-items-first">
                        <a href="/Uno/">Uno</a>
                        <a href="/Duo/">Duo</a>
                        <a href="/Tres/">Tres</a>
                    </nav>
                    <nav class="header-flex-items-second">
                        <a href="/login/">Login</a>
                    </nav>
                </div>
                <div class="content">
                    <h3>Content</h3>
                    <div class="grid-container-content">
                        {Domains.map((domain, index) => (
                            <div class="grid-item-content"
                                key={index}
                            >
                                {domain.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div class="menu">

                    <div class="grid-container-menu">

                        <h3>Menu</h3>
                        <div class="grid-item-menu color11">Grid Item</div>
                        <div class="grid-item-menu color22">Grid Item</div>
                        <div class="grid-item-menu color33">Grid Item</div>
                        <div class="grid-item-menu color44">Grid Item</div>
                        <div class="grid-item-menu color11">Grid Item</div>
                        <div class="grid-item-menu color44">Grid Item</div>
                        <div class="grid-item-menu color55">Grid Item</div>
                    </div>


                </div>
                <div class="footer">
                    <h3>Footer</h3>
                </div>
            </div>
        );
    }
}

export default App;