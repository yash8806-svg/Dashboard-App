import React from 'react'
import { BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer,Legend } from 'recharts'

const Charts = ({revenueData}) => {
  return (
    <div>
       <h3>Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

export default Charts
