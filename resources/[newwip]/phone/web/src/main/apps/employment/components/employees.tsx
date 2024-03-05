import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useRecoilState } from 'recoil';
import { activeHoverIdState } from '../../../../atoms/activeAtom';
import { Checkmark } from 'react-checkmark';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { useHistory, useParams } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, Menu, MenuItem, Tooltip } from '@mui/material';
import useStyles from "./employees.styles";

const EmployeesApp: React.FC = () => {
  const classes = useStyles();

  const [hoverId, setHoverId] = useRecoilState(activeHoverIdState) // why in tarnation is this a global state?
  const [employeeData, setEmployeeData] = useState([])
  const [filteredEmployeeData, setFilteredEmployeeData] = useState([])
  const [userPermission, setUserPermission] = useState({
    roleManage: false,
    roleCreate: false,
    canHire: false,
    canFire: false,
    canCharge: false
  })
  const [employeeRoles, setEmployeeRoles] = useState([])
  const [editEmployeeModal, setEditEmployeeModal] = useState(false)
  const [hireEmployeeModal, setHireEmployeeModal] = useState(false)
  const [chargeCustomerModal, setChargeCustomerModal] = useState(false)
  const [deleteRoleModal, setDeleteRoleModal] = useState(false)
  const [createRoleModal, setCreateRoleModal] = useState(false)
  const [editRoleModal, setEditRoleModal] = useState(false)
  const [hireAccess, setHireAccess] = useState(false)
  const [fireAccess, setFireAccess] = useState(false)
  const [changeRoleAccess, setChangeRoleAccess] = useState(false)
  const [payEmployeeAccess, setPayEmployeeAccess] = useState(false)
  const [payExternalAccess, setPayExternalAccess] = useState(false)
  const [chargeExternalAccess, setChargeExternalAccess] = useState(false)
  const [propertyKeysAccess, setPropertKeysAccess] = useState(false)
  const [stashAccess, setStashAccess] = useState(false)
  const [craftAccess, setCraftAccess] = useState(false)
  const [bankAccess, setBankAccess] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [currentEmployeeStateID, setCurrentEmployeeStateID] = useState("")
  const [currentEmployeeRole, setCurrentEmployeeRole] = useState("")
  const [hireEmployeeStateID, setHireEmployeeStateID] = useState("")
  const [chargeCustomerStateID, setChargeCustomerStateID] = useState(0)
  const [chargeCustomerAmount, setChargeCustomerAmount] = useState(0)
  const [chargeCustomerComment, setChargeCustomerComment] = useState("")
  const [createRoleName, setCreateRoleName] = useState("")
  const [editRoleRole, setEditRoleRole] = useState("")

  const [employeeNewRole, setEmployeeNewRole] = useState("")
  const [myCid, setMyCid] = useState(0)
  const { businessId } = useParams<{ businessId: string }>();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchNui('getEmployeesData', { id: businessId }).then(resData => {
      setEmployeeData(resData.employees)
      setFilteredEmployeeData(resData.employees)
      setEmployeeRoles(resData.roles)
      setMyCid(resData.cid)
      setUserPermission(resData.permission)
    })
  }, [businessId]);

  const serachEmployees = (searchValue) => {
    if (searchValue !== '') {
      const filteredEmployees = employeeData.filter((item) => {
        return item.name.toLowerCase().startsWith(searchValue.toLowerCase());
      })
      setFilteredEmployeeData(filteredEmployees)
    } else {
      setFilteredEmployeeData(employeeData)
    }
  }

  const openDeleteRoleModal = () => {
    setAnchorEl(null)
    setDeleteRoleModal(true)
  }

  const closeDeleteRoleModal = () => {
    setDeleteRoleModal(false)
  }

  const openCreateRoleModal = () => {
    setAnchorEl(null)
    setCreateRoleModal(true)
  }

  const closeCreateRoleModal = () => {
    setCreateRoleModal(false)
    setCreateRoleName("")
  }

  const openChargeCustomerModal = () => {
    setAnchorEl(null)
    setChargeCustomerModal(true)
  }

  const closeChargeCustomerModal = () => {
    setChargeCustomerModal(false)
    setChargeCustomerStateID(0)
    setChargeCustomerAmount(0)
    setChargeCustomerComment("")
  }

  const updateCreateRoleName = (e: any) => {
    setCreateRoleName(e.target.value)
  }

  const updateChargeCustomerStateID = (e: any) => {
    setChargeCustomerStateID(e.target.value)
  }

  const updateChargeCustomerAmount = (e: any) => {
    setChargeCustomerAmount(e.target.value)
  }

  const updateChargeCustomerComment = (e: any) => {
    setChargeCustomerComment(e.target.value)
  }

  const updateHireAccess = (e: any) => {
    setHireAccess(e.target.checked)
  }

  const updateFireAccess = (e: any) => {
    setFireAccess(e.target.checked)
  }

  const updateChangeRoleAccess = (e: any) => {
    setChangeRoleAccess(e.target.checked)
  }

  const updatePayEmployeeAccess = (e: any) => {
    setPayEmployeeAccess(e.target.checked)
  }

  const updatePayExternalAccess = (e: any) => {
    setPayExternalAccess(e.target.checked)
  }

  const updateChargeExternalAccess = (e: any) => {
    setChargeExternalAccess(e.target.checked)
  }

  const updatePropertyKeysAccess = (e: any) => {
    setPropertKeysAccess(e.target.checked)
  }

  const updateStashAccess = (e: any) => {
    setStashAccess(e.target.checked)
  }

  const updateCraftAccess = (e: any) => {
    setCraftAccess(e.target.checked)
  }

  const updateBankAccess = (e: any) => {
    setBankAccess(e.target.checked)
  }

  const openHireEmployeeModal = () => {
    setAnchorEl(null)
    setHireEmployeeModal(true)
  }

  const closeHireEmployeeModal = () => {
    setHireEmployeeModal(false)
    setHireEmployeeStateID("")
  }

  const openEditRoleModal = () => {
    setEditRoleRole("Owner")
    setAnchorEl(null)
    setEditRoleModal(true)
  }

  const updateEditRoleRole = (e: any) => {
    setEmployeeNewRole(e.target.value)
    fetchNui('getRolePermission', { businessid: businessId, role: e.target.value }).then(resData => {
      setHireAccess(resData.canHire)
      setFireAccess(resData.canFire)
      setChangeRoleAccess(resData.roleManage)
      setPropertKeysAccess(resData.hasKeys)
      setChargeExternalAccess(resData.canCharge)
      setStashAccess(resData.hasStash)
      setCraftAccess(resData.hasCraft)
      setBankAccess(resData.hasBank)
    })
  }

  const closeEditRoleModal = () => {
    setEditRoleModal(false)
    setEditRoleRole("Owner")
  }

  const updateHireEmployeeStateID = (e: any) => {
    setHireEmployeeStateID(e.target.value)
  }

  const openEditEmployeeRoleModal = (e: any) => {
    setCurrentEmployeeStateID(e.currentTarget.id)
    setEditEmployeeModal(true)
  }

  const handleRemoveEmployee = (e: any) => {
    fetchNui('removeEmployee', { id: e.currentTarget.id, businessid: businessId }).then(resData => {
      setEmployeeData(resData.employees)
      setFilteredEmployeeData(resData.employees)
      setEmployeeRoles(resData.roles)
      setMyCid(resData.cid)
    })
  }

  const setCurrentRole = (e: any) => {
    setCurrentEmployeeRole(e.currentTarget.id)
  }

  const closeEditEmployeeModal = () => {
    setEditEmployeeModal(false)
  }

  const handleDeleteRole = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('deleteRole', { businessid: businessId, role: employeeNewRole }).then(resData => {
      setEmployeeData(resData.employees)
      setFilteredEmployeeData(resData.employees)
      setEmployeeRoles(resData.roles)
      setMyCid(resData.cid)
      setLoading(false)
      setCheckmark(true)
      setTimeout(() => {
        setCheckmark(false)
        setDeleteRoleModal(false)
        setPreparing(false)
      }, 1000)
    })
  }

  const handleCreateRole = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('createRole', { businessid: businessId, role: createRoleName, permissions: { hire: hireAccess, fire: fireAccess, changeRole: changeRoleAccess, payEmployee: payEmployeeAccess, payExternal: payExternalAccess, chargeExternal: chargeExternalAccess, propertyKeys: propertyKeysAccess, stash: stashAccess, craft: craftAccess, bank: bankAccess } }).then(resData => {
      setEmployeeData(resData.employees)
      setFilteredEmployeeData(resData.employees)
      setEmployeeRoles(resData.roles)
      setMyCid(resData.cid)
      setHireAccess(false)
      setFireAccess(false)
      setChangeRoleAccess(false)
      setPayEmployeeAccess(false)
      setPayExternalAccess(false)
      setChargeExternalAccess(false)
      setPropertKeysAccess(false)
      setStashAccess(false)
      setCraftAccess(false)
      setBankAccess(false)
      setLoading(false)
      setCheckmark(true)
      setTimeout(() => {
        setCheckmark(false)
        setCreateRoleModal(false)
        setCreateRoleName("")
        setPreparing(false)
      }, 1000)
    })
  }

  const handleEditRole = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('editRole', { businessid: businessId, role: employeeNewRole, permissions: { hire: hireAccess, fire: fireAccess, changeRole: changeRoleAccess, payEmployee: payEmployeeAccess, payExternal: payExternalAccess, chargeExternal: chargeExternalAccess, propertyKeys: propertyKeysAccess, stash: stashAccess, craft: craftAccess, bank: bankAccess } }).then(resData => {
      setEmployeeData(resData.employees)
      setFilteredEmployeeData(resData.employees)
      setEmployeeRoles(resData.roles)
      setMyCid(resData.cid)
      setEditRoleRole("Owner")
      setLoading(false)
      setCheckmark(true)
      setTimeout(() => {
        setCheckmark(false)
        setEditRoleModal(false)
        setPreparing(false)
      }, 1000)
    })
  }

  const handleEmployeeRoleEdit = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('editEmployee', { id: currentEmployeeStateID, businessid: businessId, role: employeeNewRole }).then(resData => {
      setEmployeeData(resData.employees)
      setFilteredEmployeeData(resData.employees)
      setEmployeeRoles(resData.roles)
      setMyCid(resData.cid)
      setLoading(false)
      setCheckmark(true)
      setTimeout(() => {
        setCheckmark(false)
        setEditEmployeeModal(false)
        setPreparing(false)
      }, 1000)
    })
  }

  const handleEmployeeHire = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('hireEmployee', { id: hireEmployeeStateID, businessid: businessId, role: employeeNewRole }).then(resData => {
      setEmployeeData(resData.employees)
      setFilteredEmployeeData(resData.employees)
      setEmployeeRoles(resData.roles)
      setMyCid(resData.cid)
      setLoading(false)
      setCheckmark(true)
      setTimeout(() => {
        setCheckmark(false)
        setHireEmployeeModal(false)
        setPreparing(false)
      }, 1000)
    })
  }

  const handleChargeCustomer = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('chargeCustomer', { id: chargeCustomerStateID, businessid: businessId, amount: chargeCustomerAmount, comment: chargeCustomerComment }).then(resData => {
      setLoading(false)
      setCheckmark(true)
      setChargeCustomerStateID(0)
      setChargeCustomerAmount(0)
      setChargeCustomerComment("")
      setTimeout(() => {
        setCheckmark(false)
        setChargeCustomerModal(false)
        setPreparing(false)
      }, 1000)
    })
  }

  const handleHoverActive = (e: any) => {
    setHoverId(e.currentTarget.id)
  }

  const updateNewRole = (e: any) => {
    setEmployeeNewRole(e.target.value)
  }

  const handleHoverNotActive = () => {
    setHoverId("")
  }

  let history = useHistory();

  const goBack = () => {
    history.push('/employment')
  }

  useNuiEvent<boolean>('closeApps', () => {
    setLoading(false)
    setCheckmark(false)
    setPreparing(false)
    setEditEmployeeModal(false)
    setHireEmployeeModal(false)
    setChargeCustomerModal(false)
    setDeleteRoleModal(false)
    setCreateRoleModal(false)
    setEditRoleModal(false)
    setHireAccess(false)
    setFireAccess(false)
    setChangeRoleAccess(false)
    setPayEmployeeAccess(false)
    setPayExternalAccess(false)
    setChargeExternalAccess(false)
    setPropertKeysAccess(false)
    setStashAccess(false)
    setCraftAccess(false)
    setBankAccess(false)
    setAnchorEl(null)
    setCurrentEmployeeStateID("")
    setCurrentEmployeeRole("")
    setEmployeeNewRole("")
    setHireEmployeeStateID("")
    setChargeCustomerStateID(0)
    setChargeCustomerAmount(0)
    setChargeCustomerComment("")
    setCreateRoleName("")
    setEditRoleRole("Owner")
  })

  return (
    <>
      <div className={classes.employeeEditEmployeeModalContainer} style={{ display: editEmployeeModal ? '' : 'none' }}>
        <div className={classes.employeeEditEmployeeModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="State ID"
                    variant="standard"
                    value={currentEmployeeStateID}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-id-card"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Role"
                    variant="standard"
                    defaultValue={currentEmployeeRole}
                    onChange={updateNewRole}
                    select>
                    {employeeRoles.map(({ value, label }, index) => <MenuItem key={label} value={label} >{label}</MenuItem>)}
                  </TextField>

                </FormControl>
              </div>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeEditEmployeeModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleEmployeeRoleEdit} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.employeeHireEmployeeModalContainer} style={{ display: hireEmployeeModal ? '' : 'none' }}>
        <div className={classes.employeeHireEmployeeModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    className={classes.input}
                    id="input-with-icon-textfield"
                    type="number"
                    label="State ID"
                    variant="standard"
                    onChange={updateHireEmployeeStateID}
                    value={hireEmployeeStateID}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-id-card"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Role"
                    variant="standard"
                    onChange={updateNewRole}
                    select>
                    {employeeRoles.map(({ value, label }, index) => <MenuItem key={label} value={label} >{label}</MenuItem>)}
                  </TextField>

                </FormControl>
              </div>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeHireEmployeeModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleEmployeeHire} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.employeeChargeCustomerModalContainer} style={{ display: chargeCustomerModal ? '' : 'none' }}>
        <div className={classes.employeeChargeCustomerModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    className={classes.input}
                    id="input-with-icon-textfield"
                    type="number"
                    label="State ID"
                    variant="standard"
                    onChange={updateChargeCustomerStateID}
                    value={chargeCustomerStateID}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-id-card"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    className={classes.input}
                    id="input-with-icon-textfield"
                    type="number"
                    label="Amount"
                    variant="standard"
                    onChange={updateChargeCustomerAmount}
                    value={chargeCustomerAmount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-dollar-sign"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <FormControl fullWidth sx={{ width: '100%' }}>
                <TextField
                  multiline
                  rows={2}
                  id="input-with-icon-textfield"
                  label="Comment"
                  variant="standard"
                  onChange={updateChargeCustomerComment}
                  value={chargeCustomerComment}
                />
              </FormControl>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeChargeCustomerModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleChargeCustomer} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.employeeDeleteRoleModalContainer} style={{ display: deleteRoleModal ? '' : 'none' }}>
        <div className={classes.employeeDeleteRoleModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Role"
                    variant="standard"
                    onChange={updateNewRole}
                    select>
                    {employeeRoles.map(({ value, label }, index) => <MenuItem key={label} value={label} >{label}</MenuItem>)}
                  </TextField>
                </FormControl>
              </div>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeDeleteRoleModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleDeleteRole} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.employeeCreateRoleModalContainer} style={{ display: createRoleModal ? '' : 'none' }}>
        <div className={classes.employeeCreateRoleModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Role Name"
                    variant="standard"
                    onChange={updateCreateRoleName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-tag"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={hireAccess} onChange={updateHireAccess} />} label="Hire" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={fireAccess} onChange={updateFireAccess} />} label="Fire" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={changeRoleAccess} onChange={updateChangeRoleAccess} />} label="Change Role" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={payEmployeeAccess} onChange={updatePayEmployeeAccess} />} label="Pay Employee" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={payExternalAccess} onChange={updatePayExternalAccess} />} label="Pay External" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={chargeExternalAccess} onChange={updateChargeExternalAccess} />} label="Charge External" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={propertyKeysAccess} onChange={updatePropertyKeysAccess} />} label="Property Keys" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={stashAccess} onChange={updateStashAccess} />} label="Stash Access" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={craftAccess} onChange={updateCraftAccess} />} label="Craft Access" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={bankAccess} onChange={updateBankAccess} />} label="Bank Access" />
                </FormControl>
              </div>
            </div>
            <div className="buttons" style={{ marginTop: '0px' }}>
              <div>
                <Button onClick={closeCreateRoleModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleCreateRole} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.employeeEditRoleModalContainer} style={{ display: editRoleModal ? '' : 'none' }}>
        <div className={classes.employeeEditRoleModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Role"
                    variant="standard"
                    onChange={updateEditRoleRole}
                    select>
                    {employeeRoles.map(({ value, label }, index) => <MenuItem key={label} value={label} >{label}</MenuItem>)}
                  </TextField>
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={hireAccess} onChange={updateHireAccess} />} label="Hire" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={fireAccess} onChange={updateFireAccess} />} label="Fire" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={changeRoleAccess} onChange={updateChangeRoleAccess} />} label="Change Role" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={payEmployeeAccess} onChange={updatePayEmployeeAccess} />} label="Pay Employee" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={payExternalAccess} onChange={updatePayExternalAccess} />} label="Pay External" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={chargeExternalAccess} onChange={updateChargeExternalAccess} />} label="Charge External" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={propertyKeysAccess} onChange={updatePropertyKeysAccess} />} label="Property Keys" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={stashAccess} onChange={updateStashAccess} />} label="Stash Access" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={craftAccess} onChange={updateCraftAccess} />} label="Craft Access" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={bankAccess} onChange={updateBankAccess} />} label="Bank Access" />
                </FormControl>
              </div>
            </div>
            <div className="buttons" style={{ marginTop: '0px' }}>
              <div>
                <Button onClick={closeEditRoleModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleEditRole} size="small" color="success" variant="contained">Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.employeesOuterContainer} style={{ zIndex: 500 }}>
        <div className={classes.employeesInnerContainer}>
          <div className="employees-container">
            <div className={classes.employeesSearch}>
              <Tooltip title="Go Back" placement="right" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                <div style={{ color: '#fff', width: '40px', display: 'flex', alignItems: 'center' }}>
                  <i onClick={goBack} className="fas fa-chevron-left fa-w-10 fa-fw fa-lg"></i>
                </div>
              </Tooltip>
              <div className={classes.employeesSearchWrapper}>
                <div className="input-wrapper">
                  <FormControl fullWidth sx={{ width: '100%' }}>
                    <TextField
                      id="input-with-icon-textfield"
                      label="Search"
                      onChange={(e) => serachEmployees(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className={classes.employeesIcon}>
              <div className={classes.employeesIconWrapper}>
                <i onClick={handleClick} style={{ display: userPermission.roleCreate || userPermission.roleManage || userPermission.canHire || userPermission.canCharge ? '' : 'none', fontSize: '1.2em' }} className="fas fa-ellipsis-v fa-w-16 fa-fw fa-lg"></i>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem style={{ display: userPermission.canHire ? '' : 'none' }} onClick={openHireEmployeeModal}><i className="fas fa-user-plus" style={{ display: userPermission.canHire ? '' : 'none', marginRight: '5%' }}></i> Hire</MenuItem>
                  <MenuItem style={{ display: userPermission.canCharge ? '' : 'none' }} onClick={openChargeCustomerModal}><i className="fas fa-credit-card" style={{ display: userPermission.canCharge ? '' : 'none', marginRight: '5%' }}></i> Charge Customer</MenuItem>
                  <MenuItem style={{ display: userPermission.roleCreate ? '' : 'none' }} onClick={openCreateRoleModal}><i className="fas fa-user-tag" style={{ display: userPermission.roleCreate ? '' : 'none', marginRight: '5%' }}></i> Create Role</MenuItem>
                  <MenuItem style={{ display: userPermission.roleManage ? '' : 'none' }} onClick={openEditRoleModal}><i className="fas fa-user-tag" style={{ display: userPermission.roleManage ? '' : 'none', marginRight: '5%' }}></i> Edit Role</MenuItem>
                  <MenuItem style={{ display: userPermission.roleManage ? '' : 'none' }} onClick={openDeleteRoleModal}><i className="fas fa-user-tag" style={{ display: userPermission.roleManage ? '' : 'none', marginRight: '5%' }}></i> Delete Role</MenuItem>
                </Menu>
              </div>
            </div>
            <div className={classes.employeesEmployees}>
              {filteredEmployeeData && filteredEmployeeData.length > 0 ? (
                filteredEmployeeData.sort((a, b) => Number(b.rank) - Number(a.rank)).map((employee, index) => (
                  <div key={employee.id} id={employee.id} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                    <div className="main-container">
                      <div className="image">
                        <i className={`fas ${employee.icon} fa-w-16 fa-fw fa-3x`}></i>
                      </div>
                      <div className="details">
                        <div className="title">
                          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{employee.name}</Typography>
                        </div>
                        <div className="description">
                          <div className="flex-row">
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{employee.businessrole}</Typography>
                          </div>
                        </div>
                      </div>
                      <div className={hoverId.toString() === employee.id.toString() && employee.cid.toString() !== myCid.toString() ? "actions actions-show" : "actions"}>
                        <Tooltip title="Edit Role" placement="top" sx={{ display: userPermission.roleManage ? '' : 'none', backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div style={{ display: userPermission.roleManage ? '' : 'none' }} onClick={setCurrentRole} id={employee.businessrole}>
                            <i onClick={openEditEmployeeRoleModal} id={employee.cid} className="fas fa-user-tag fa-w-16 fa-fw fa-lg"></i>
                          </div>
                        </Tooltip>
                        <Tooltip title="Remove Employee" placement="top" sx={{ display: userPermission.canFire ? '' : 'none', backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div style={{ display: userPermission.canFire ? '' : 'none' }}>
                            <i onClick={handleRemoveEmployee} id={employee.cid} className="fas fa-user-slash fa-w-16 fa-fw fa-lg"></i>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-centered" style={{ padding: '32px', flexDirection: 'column', textAlign: 'center' }}>
                  <i className="fas fa-frown fa-w-16 fa-fw fa-3x" style={{ color: '#fff', marginBottom: '32px' }}></i>
                  <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Nothing Here!</Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeesApp;