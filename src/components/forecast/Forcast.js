import React from "react";
import './Forcast.css';
import {
  Accordion,
  AccordionItemPanel,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItem,
} from "react-accessible-accordion";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forcast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forcastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  console.log(forcastDays);
  return (
    <div>
      <label className="title"> Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="dailyItem">
                  <img
                    alt="weather"
                    className="iconSmall"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forcastDays[index]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="minMax">
                    {Math.round(item.main.temp_min)}°C -{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="dailyDetailsGrid">
                <div className="dailyDetailsGridItem">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="dailyDetailsGridItem">
                  <label>Humidity</label>
                  <label>{item.main.humidity} %</label>
                </div>
                <div className="dailyDetailsGridItem">
                  <label>Clouds</label>
                  <label>{item.clouds.all} %</label>
                </div>
                <div className="dailyDetailsGridItem">
                  <label>Wind Speed</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="dailyDetailsGridItem">
                  <label>Sea Level</label>
                  <label>{item.main.sea_level} m</label>
                </div>
                <div className="dailyDetailsGridItem">
                  <label>Feels Like</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Forcast;
