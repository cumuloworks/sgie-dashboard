import axios from "axios";

export default async function handler(req, res) {
  const device_id = process.env.NEXT_PUBLIC_SB_DEVICEID;
  const token = process.env.NEXT_PUBLIC_SB_TOKEN;
  const url = `https://api.switch-bot.com/v1.0/devices/${device_id}/status`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    if (response.data?.body?.temperature) {
      res.status(200).json(response.data.body.temperature);
    } else {
      res.status(400).send("ERR");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("ERR");
  }
}
