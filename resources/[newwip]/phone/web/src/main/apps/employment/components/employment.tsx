import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { Link } from 'react-router-dom';
import AppContainer from '../../../components/app-container';

const EmploymentApp: React.FC = () => {
  const [employmentData, setEmploymentData] = useState([])
  const [filteredEmploymentData, setFilteredEmploymentData] = useState([])

  useEffect(() => {
    fetchNui('getEmploymentData', {}).then(resData => {
      setEmploymentData(resData)
      setFilteredEmploymentData(resData)
    })
  }, []);

  useNuiEvent<boolean>('closeApps', () => {
  })

  const primaryActions: any = [];

  return (
    <>
      <AppContainer
        emptyMessage={filteredEmploymentData.length === 0}
        primaryActions={primaryActions}
        search={{
          filter: ['businessname'],
          list: employmentData,
          onChange: setFilteredEmploymentData,
        }}
      >
        {filteredEmploymentData && filteredEmploymentData.length > 0 ? (
          filteredEmploymentData.map((employment, index) => (
            <Link to={`/employees/${employment.businessid}`} style={{ color: '#fff', textDecoration: 'none' }}>
              <div key={employment.id} id={employment.id} className="component-paper cursor-pointer">
                <div className="main-container">
                  <div className="image">
                    <i className="fas fa-business-time fa-w-16 fa-fw fa-3x"></i>
                  </div>
                  <div className="details">
                    <div className="title">
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{employment.businessname}</Typography>
                    </div>
                    <div className="description">
                      <div className="flex-row">
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{employment.businessrole}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className="actions">
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <>
          </>
        )}
      </AppContainer>
    </>
  );
}

export default EmploymentApp;