import axios from 'axios';

export default async function handler(req, res) {
  const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
  const date = new Date();
  const dateTypeURL = `https://s-proj.com/utils/checkHoliday.php?kind=h&date=${date.toISOString().slice(0, 10).replace(/-/g, '')}`;

  const dateTypeResponse = await axios.get(dateTypeURL);
  const dateType = dateTypeResponse.data; // axiosでは、dataプロパティからデータにアクセス
  const timetableType = dateType === 'holiday' ? 'SaturdayHoliday' : 'Weekday';

  const jsonURL = `https://api.odpt.org/api/v4/odpt:StationTimetable?odpt:station=odpt.Station:TokyoMetro.Fukutoshin.ShinjukuSanchome&acl:consumerKey=${consumerKey}`;
  const trainInfoURL = `https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:railway=odpt.Railway:TokyoMetro.Fukutoshin&acl:consumerKey=${consumerKey}`;

  const dataResponse = await axios.get(jsonURL);
  const data = dataResponse.data; // axiosでは、dataプロパティからデータにアクセス

  const trainInfoResponse = await axios.get(trainInfoURL);
  const trainInfo = trainInfoResponse.data; // axiosでは、dataプロパティからデータにアクセス

  res.status(200).json({ timetableType, data, trainInfo });
}
