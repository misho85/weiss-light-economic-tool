import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import useMedia from '../utils/useMedia';
import useStyledTheme from '../utils/useStyledTheme';

const MyResponsiveBar = ({ data }) => {
  const { colors, sizes } = useStyledTheme();
  const desktop = useMedia(`(max-width: ${sizes.desktop}px)`);
  const phone = useMedia(`(max-width: ${sizes.phone}px)`);

  return (
    <ResponsiveBar
      data={data}
      keys={['trenutno', 'preporučeno']}
      indexBy="time"
      margin={{ top: 50, right: phone ? 30 : 130, bottom: 50, left: 60 }}
      padding={0.4}
      innerPadding={2}
      groupMode="grouped"
      layout={desktop ? `horizontal` : `vertical`}
      colors={[colors.redLight, colors.greenLight]}
      borderRadius={5}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: phone ? -45 : 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      // enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={
        phone
          ? []
          : [
              {
                dataFrom: 'keys',
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
      }
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default MyResponsiveBar;
