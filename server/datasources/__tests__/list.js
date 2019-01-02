const ListAPI = require("../list");

const mocks = {
  get: jest.fn()
};

const ds = new ListAPI();
ds.get = mocks.get;

describe("[ListAPI.albumReducer]", () => {
  it("properly transforms album", () => {
    expect(ds.albumReducer(mockOneAlbumResponse)).toEqual(mockOneAlbum);
  });
});

describe("[ListAPI.getAlbumById]", () => {
  it("should call /album/:id to look up single album from api", async () => {
    // if api response is list of raw albumes,
    // res should be single transformed album
    mocks.get.mockReturnValueOnce(mockOneAlbumResponse);
    const res = await ds.getAlbumById({ id: "66at85wgO2pu5CccvqUF6i" });

    expect(res).toEqual(mockOneAlbum);
    expect(mocks.get).toBeCalledWith("albums/66at85wgO2pu5CccvqUF6i");
  });
});

describe("[ListAPI.getAlbumsByIds]", () => {
  it("should call /albums and get an array of albums", async () => {
    mocks.get.mockReturnValueOnce(mockTwoAlbumResponse);

    const res = await ds.getAlbumsByIds({
      ids: ["66at85wgO2pu5CccvqUF6i", "2OnNdRdzqs0Xe6VU2uGdPe"]
    });

    expect(res).toEqual(mockTwoAlbum);
    expect(mocks.get).toBeCalledWith("albums", {
      ids: ["66at85wgO2pu5CccvqUF6i", "2OnNdRdzqs0Xe6VU2uGdPe"]
    });
  });
});

/**
 * MOCK DATA
 */

// properly transformed album
const mockOneAlbum = {
  id: "66at85wgO2pu5CccvqUF6i",
  name: "Some Rap Songs",
  artists: [
    {
      id: "3A5tHz1SfngyOZM2gItYKu",
      name: "Earl Sweatshirt"
    }
  ],
  release_date: "2018-11-30",
  total_tracks: 15,
  images: [
    {
      height: 640,
      url: "https://i.scdn.co/image/83ac09828f27e5c5ce893acf3d14a3868ac0ca83",

      width: 640
    },
    {
      height: 300,
      url: "https://i.scdn.co/image/376ccd3bda8d5ad2b7b0fc9710337a585b013daf",

      width: 300
    },
    {
      height: 64,
      url: "https://i.scdn.co/image/89d9fbb4cad3e664dd49ba9fb4aa2159791e6d6b",

      width: 64
    }
  ]
};

const mockTwoAlbum = [
  {
    id: "66at85wgO2pu5CccvqUF6i",
    name: "Some Rap Songs",
    artists: [
      {
        id: "3A5tHz1SfngyOZM2gItYKu",
        name: "Earl Sweatshirt"
      }
    ],
    release_date: "2018-11-30",
    total_tracks: 15,
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/83ac09828f27e5c5ce893acf3d14a3868ac0ca83",
        width: 640
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/376ccd3bda8d5ad2b7b0fc9710337a585b013daf",
        width: 300
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/89d9fbb4cad3e664dd49ba9fb4aa2159791e6d6b",
        width: 64
      }
    ]
  },
  {
    id: "2OnNdRdzqs0Xe6VU2uGdPe",
    name: "Below the Heavens",
    artists: [
      {
        id: "1KeJhR0ENFviw187pD4LPT",
        name: "Blu"
      },
      {
        id: "4r4XYZJUeeKCcrkvi7voDP",
        name: "Exile"
      }
    ],
    release_date: "2007-08-07",
    total_tracks: 15,
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/d0c053748e35d817701a571147940087c5121ff3",
        width: 640
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/a5216cb598be9d73fbac1e50ff3e14ca4addb285",
        width: 300
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/59afe5d29325f1a76f57dbde6df51556ccaf1895",
        width: 64
      }
    ]
  }
];

// raw album response from API
const mockOneAlbumResponse = {
  album_type: "album",
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/3A5tHz1SfngyOZM2gItYKu"
      },
      href: "https://api.spotify.com/v1/artists/3A5tHz1SfngyOZM2gItYKu",
      id: "3A5tHz1SfngyOZM2gItYKu",
      name: "Earl Sweatshirt",
      type: "artist",
      uri: "spotify:artist:3A5tHz1SfngyOZM2gItYKu"
    }
  ],
  available_markets: [
    "AD",
    "AE",
    "AR",
    "AT",
    "AU",
    "BE",
    "BG",
    "BH",
    "BO",
    "BR",
    "CA",
    "CH",
    "CL",
    "CO",
    "CR",
    "CY",
    "CZ",
    "DE",
    "DK",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "ES",
    "FI",
    "FR",
    "GB",
    "GR",
    "GT",
    "HK",
    "HN",
    "HU",
    "ID",
    "IE",
    "IL",
    "IS",
    "IT",
    "JO",
    "JP",
    "KW",
    "LB",
    "LI",
    "LT",
    "LU",
    "LV",
    "MA",
    "MC",
    "MT",
    "MX",
    "MY",
    "NI",
    "NL",
    "NO",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PH",
    "PL",
    "PS",
    "PT",
    "PY",
    "QA",
    "RO",
    "SA",
    "SE",
    "SG",
    "SK",
    "SV",
    "TH",
    "TN",
    "TR",
    "TW",
    "US",
    "UY",
    "VN",
    "ZA"
  ],
  copyrights: [
    {
      text:
        "(P) 2018 Tan Cressida, under exclusive license to Columbia Records, a Division of Sony Music Entertainment",
      type: "P"
    }
  ],
  external_ids: {
    upc: "886447287286"
  },
  external_urls: {
    spotify: "https://open.spotify.com/album/66at85wgO2pu5CccvqUF6i"
  },
  genres: [],
  href: "https://api.spotify.com/v1/albums/66at85wgO2pu5CccvqUF6i",
  id: "66at85wgO2pu5CccvqUF6i",
  images: [
    {
      height: 640,
      url: "https://i.scdn.co/image/83ac09828f27e5c5ce893acf3d14a3868ac0ca83",
      width: 640
    },
    {
      height: 300,
      url: "https://i.scdn.co/image/376ccd3bda8d5ad2b7b0fc9710337a585b013daf",
      width: 300
    },
    {
      height: 64,
      url: "https://i.scdn.co/image/89d9fbb4cad3e664dd49ba9fb4aa2159791e6d6b",
      width: 64
    }
  ],
  label: "Tan Cressida/Columbia",
  name: "Some Rap Songs",
  popularity: 81,
  release_date: "2018-11-30",
  release_date_precision: "day",
  total_tracks: 15,
  type: "album",
  uri: "spotify:album:66at85wgO2pu5CccvqUF6i"
};

const mockTwoAlbumResponse = {
  albums: [
    {
      album_type: "album",
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/3A5tHz1SfngyOZM2gItYKu"
          },
          href: "https://api.spotify.com/v1/artists/3A5tHz1SfngyOZM2gItYKu",
          id: "3A5tHz1SfngyOZM2gItYKu",
          name: "Earl Sweatshirt",
          type: "artist",
          uri: "spotify:artist:3A5tHz1SfngyOZM2gItYKu"
        }
      ],
      available_markets: [
        "AD",
        "AE",
        "AR",
        "AT",
        "AU",
        "BE",
        "BG",
        "BH",
        "BO",
        "BR",
        "CA",
        "CH",
        "CL",
        "CO",
        "CR",
        "CY",
        "CZ",
        "DE",
        "DK",
        "DO",
        "DZ",
        "EC",
        "EE",
        "EG",
        "ES",
        "FI",
        "FR",
        "GB",
        "GR",
        "GT",
        "HK",
        "HN",
        "HU",
        "ID",
        "IE",
        "IL",
        "IS",
        "IT",
        "JO",
        "JP",
        "KW",
        "LB",
        "LI",
        "LT",
        "LU",
        "LV",
        "MA",
        "MC",
        "MT",
        "MX",
        "MY",
        "NI",
        "NL",
        "NO",
        "NZ",
        "OM",
        "PA",
        "PE",
        "PH",
        "PL",
        "PS",
        "PT",
        "PY",
        "QA",
        "RO",
        "SA",
        "SE",
        "SG",
        "SK",
        "SV",
        "TH",
        "TN",
        "TR",
        "TW",
        "US",
        "UY",
        "VN",
        "ZA"
      ],
      copyrights: [
        {
          text:
            "(P) 2018 Tan Cressida, under exclusive license to Columbia Records, a Division of Sony Music Entertainment",
          type: "P"
        }
      ],
      external_ids: {
        upc: "886447287286"
      },
      external_urls: {
        spotify: "https://open.spotify.com/album/66at85wgO2pu5CccvqUF6i"
      },
      genres: [],
      href: "https://api.spotify.com/v1/albums/66at85wgO2pu5CccvqUF6i",
      id: "66at85wgO2pu5CccvqUF6i",
      images: [
        {
          height: 640,
          url:
            "https://i.scdn.co/image/83ac09828f27e5c5ce893acf3d14a3868ac0ca83",
          width: 640
        },
        {
          height: 300,
          url:
            "https://i.scdn.co/image/376ccd3bda8d5ad2b7b0fc9710337a585b013daf",
          width: 300
        },
        {
          height: 64,
          url:
            "https://i.scdn.co/image/89d9fbb4cad3e664dd49ba9fb4aa2159791e6d6b",
          width: 64
        }
      ],
      label: "Tan Cressida/Columbia",
      name: "Some Rap Songs",
      popularity: 81,
      release_date: "2018-11-30",
      release_date_precision: "day",
      total_tracks: 15,
      type: "album",
      uri: "spotify:album:66at85wgO2pu5CccvqUF6i"
    },
    {
      album_type: "album",
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/1KeJhR0ENFviw187pD4LPT"
          },
          href: "https://api.spotify.com/v1/artists/1KeJhR0ENFviw187pD4LPT",
          id: "1KeJhR0ENFviw187pD4LPT",
          name: "Blu",
          type: "artist",
          uri: "spotify:artist:1KeJhR0ENFviw187pD4LPT"
        },
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/4r4XYZJUeeKCcrkvi7voDP"
          },
          href: "https://api.spotify.com/v1/artists/4r4XYZJUeeKCcrkvi7voDP",
          id: "4r4XYZJUeeKCcrkvi7voDP",
          name: "Exile",
          type: "artist",
          uri: "spotify:artist:4r4XYZJUeeKCcrkvi7voDP"
        }
      ],
      available_markets: [
        "AD",
        "AE",
        "AR",
        "AT",
        "AU",
        "BE",
        "BG",
        "BH",
        "BO",
        "BR",
        "CA",
        "CH",
        "CL",
        "CO",
        "CR",
        "CY",
        "CZ",
        "DE",
        "DK",
        "DO",
        "DZ",
        "EC",
        "EE",
        "EG",
        "ES",
        "FI",
        "FR",
        "GB",
        "GR",
        "GT",
        "HK",
        "HN",
        "HU",
        "ID",
        "IE",
        "IL",
        "IS",
        "IT",
        "JO",
        "JP",
        "KW",
        "LB",
        "LI",
        "LT",
        "LU",
        "LV",
        "MA",
        "MC",
        "MT",
        "MX",
        "MY",
        "NI",
        "NL",
        "NO",
        "NZ",
        "OM",
        "PA",
        "PE",
        "PH",
        "PL",
        "PS",
        "PT",
        "PY",
        "QA",
        "RO",
        "SA",
        "SE",
        "SG",
        "SK",
        "SV",
        "TH",
        "TN",
        "TR",
        "TW",
        "US",
        "UY",
        "VN",
        "ZA"
      ],
      copyrights: [
        {
          text: "2007 Sound In Color",
          type: "P"
        },
        {
          text: "2007 Sound In Color",
          type: "P"
        }
      ],
      external_ids: {
        upc: "180026000298"
      },
      external_urls: {
        spotify: "https://open.spotify.com/album/2OnNdRdzqs0Xe6VU2uGdPe"
      },
      genres: [],
      href: "https://api.spotify.com/v1/albums/2OnNdRdzqs0Xe6VU2uGdPe",
      id: "2OnNdRdzqs0Xe6VU2uGdPe",
      images: [
        {
          height: 640,
          url:
            "https://i.scdn.co/image/d0c053748e35d817701a571147940087c5121ff3",
          width: 640
        },
        {
          height: 300,
          url:
            "https://i.scdn.co/image/a5216cb598be9d73fbac1e50ff3e14ca4addb285",
          width: 300
        },
        {
          height: 64,
          url:
            "https://i.scdn.co/image/59afe5d29325f1a76f57dbde6df51556ccaf1895",
          width: 64
        }
      ],
      label: "Sound In Color",
      name: "Below the Heavens",
      popularity: 54,
      release_date: "2007-08-07",
      release_date_precision: "day",
      total_tracks: 15,
      type: "album",
      uri: "spotify:album:2OnNdRdzqs0Xe6VU2uGdPe"
    }
  ]
};
