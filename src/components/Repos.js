import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = useContext(GithubContext);
  // console.log(repos);
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    //console.log(stargazers_count);

    if (!language) return total; // return no nulls
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }

    return total;
  }, {}); // return an object
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  //console.log(mostUsed);

  // most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars }; // bc chart is looking for the pertient number to be in the value property, not stars
    })
    .slice(0, 5);
  //console.log(mostPopular);

  // stars, forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, className, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    // return an object with two properties that are objects themselves
    {
      stars: {}, // {label: 'name-data',value: 45 }
      forks: {},
    }
  );

  stars = Object.values(stars) // create an array with our stars data
    .slice(-5) // last 5 from end of array
    .reverse();
  forks = Object.values(forks) // create an array with our stars data
    .slice(-5) // last 5 from end of array
    .reverse();
  console.log(stars);

  // STEP 2 - Chart Data
  const chartData = [
    {
      label: 'HTML',
      value: '13',
    },
    {
      label: 'CSS',
      value: '23',
    },
    {
      label: 'Javascript',
      value: '80',
    },
  ];
  return (
    <section className="section">
      <Wrapper>
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
