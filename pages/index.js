import React from "react";
import Link from "next/link";
import Head from "../components/head";
import Layout from "../components/layout";

const Home = () => (
  <Layout>
    <Head title="Home" />

    <div className="hero">
      <h1 className="title">Welcome to Spotify Tensaii</h1>
      <p className="description">
        Create your Top 10 albums of the year, of the decade, of all time
        <br />
        Discover your most listend-to albums, songs and artists
      </p>
    </div>

    <style jsx>{`
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
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
  </Layout>
);

export default Home;
