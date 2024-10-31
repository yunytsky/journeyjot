import { useContext, useEffect, useState } from "react";
import BarLineChart from "../components/charts/BarLineChart";
import { getJourneys } from "../api";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const {user} = useContext(UserContext);
  const [labels, setLabels] = useState([]);
  const [journeysAmnt, setJourneysAmnt] = useState([]);
  const navigate = useNavigate();

  // Authorize user
  useEffect(() => {
    if(!user.isPremium){
      navigate("/get-premium", {replace: true});
    }
  })

  // Fetch data
  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const res = await getJourneys();
    
        const years = res.data.journeys.flatMap(journey => [
          new Date(journey.startDate).getFullYear(),
          new Date(journey.endDate).getFullYear()
        ]);
        
        // Find the minimum and maximum years
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
                
        // Generate the range of years for labels
        const labels = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

        //Journeys amnt
        const journeysCount = labels.reduce((acc, year) => {
          acc[year] = 0; // Initialize each year in the range with 0
          return acc;
        }, {});

        // Loop through each journey to count the journeys for each year in range
        res.data.journeys.forEach(journey => {
          const startYear = new Date(journey.startDate).getFullYear();
          const endYear = new Date(journey.endDate).getFullYear();

          for (let year = startYear; year <= endYear; year++) {
            journeysCount[year] += 1; 
          }
        });

        // Convert journeysCount object values to an array for setJourneysAmnt
        const journeysAmnt = labels.map(year => journeysCount[year]);

        setLabels(labels);
        setJourneysAmnt(journeysAmnt);

      } catch (error) {
          console.log("Error", error)
      }
    }

    fetchJourneys();

  }, [])

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Journeys",
        data: journeysAmnt,
        backgroundColor: "#91CC75",
      },
    ],
  };


  return (
    <div className="container mt-5 pb-5">
      <h2>Statistics</h2>
      <p className="lead" >Amount of journeys per year</p>
      <div style={{maxWidth: "780px"}}>
        <BarLineChart chartData={chartData} />
      </div>
    </div>
  );
}

export default Statistics;