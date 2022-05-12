import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export const EventGenre = ({ events }) => {
  useEffect(() => {
    const getData = () => {
      const genres = [
        'React',
        'JavaScript',
        'Node',
        'jQuery',
        'AngularJS-Remote',
      ]
      const data = genres.map((genre) => {
        const value = events.filter((event) =>
          event.summary.split(' ').includes(genre)
        ).length
        return { name: genre, value }
      })
      return data
    }
    setData(() => getData())
  }, [events])
  const [data, setData] = useState([])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill='black'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {/* {`${(percent * 100).toFixed(0)}%`} */}
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          data={data}
          cx={300}
          cy={160}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
export default EventGenre
