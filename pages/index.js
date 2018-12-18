import React from "react";
import Link from "next/link";
import Head from "../components/head";

const Home = () => (
  <div>
    <Head title="Home" />

    <div className="hero">
      <h1 className="title">Welcome to Spotify Tensaii</h1>
      <p className="description">
        Create your Top 10 albums of the year, of the decade, of all time
        <br />
        Discover your most listend to music
      </p>
    </div>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
    `}</style>
  </div>
);

export default Home;
