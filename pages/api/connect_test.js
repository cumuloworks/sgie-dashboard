import axios from "axios";

export default async function handler(req, res) {
  const urls = [process.env.URL1, process.env.URL2, process.env.URL3];
  const status = {};

  await Promise.all(
    urls.map(async (url) => {
      try {
        await axios.head(url, {
          timeout: 10000,
        });
        status[url] = true;
      } catch (error) {
        status[url] = false;
      }
    })
  );

  res.status(200).json(status);
}
