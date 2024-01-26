import React, { useEffect, useState, Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	makeStyles,
	withStyles,
	Menu,
	MenuItem,
	Avatar,
	Badge,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NestedMenuItem from 'material-ui-nested-menu-item';
import Nui from '../../util/Nui';

import { showAlert } from '../../actions/alertActions';
import {
	addToHome,
	removeFromHome,
	addToDock,
	removeFromDock,
	reorderApp,
} from '../../actions/homeActions';
import { uninstall } from '../../Apps/store/action';
import {
	addNotif,
	dismissNotif,
	openedApp,
	dismissNotifAll,
	resetApp,
} from '../../actions/notificationAction';

const useStyles = makeStyles(theme => ({
	wrapper: {
		height: '100%',
	},
	grid: {
		display: 'flex',
		height: '87.5%',
		padding: '0 10px',
		flexWrap: 'wrap',
		justifyContent: 'start',
		alignContent: 'flex-start',
		overflowX: 'hidden',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			width: 6,
		},
		'&::-webkit-scrollbar-thumb': {
			background: '#ffffff52',
		},
		'&::-webkit-scrollbar-thumb:hover': {
			background: theme.palette.primary.main,
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent',
		},
	},
	appBtn: {
		width: '25%',
		display: 'inline-block',
		textAlign: 'center',
		height: 'fit-content',
		padding: 10,
		borderRadius: 10,
		position: 'relative',
		'&:hover': {
			transition: 'background ease-in 0.15s',
			background: `${theme.palette.primary.main}40`,
			cursor: 'pointer',
		},
	},
	appContext: {
		width: '25%',
		display: 'inline-block',
		textAlign: 'center',
		height: 'fit-content',
		padding: 10,
		borderRadius: 10,
		position: 'relative',
		transition: 'background ease-in 0.15s',
		background: `${theme.palette.primary.main}40`,
	},
	appIcon: {
		fontSize: 35,
		width: 60,
		height: 60,
		margin: 'auto',
		color: '#fff',
	},
	appLabel: {
		fontSize: 13,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		textShadow: '0px 0px 5px #000000',
		fontWeight: 'normal',
		marginTop: 10,
	},
	dockBtn: {
		width: '20%',
		display: 'inline-block',
		textAlign: 'center',
		height: 'fit-content',
		padding: 10,
		borderRadius: 10,
		position: 'relative',
		'&:hover': {
			transition: 'background ease-in 0.15s',
			background: `${theme.palette.primary.main}40`,
			cursor: 'pointer',
		},
	},
	dockContext: {
		width: '20%',
		display: 'inline-block',
		textAlign: 'center',
		height: 'fit-content',
		padding: 10,
		borderRadius: 10,
		position: 'relative',
		transition: 'background ease-in 0.15s',
		background: `${theme.palette.primary.main}40`,
	},
	dock: {
		background: 'rgba(0, 0, 0, 0.25)',
		height: '12.5%',
		display: 'flex',
		justifyContent: 'space-evenly',
	},
	menuClose: {
		position: 'fixed',
		top: 0,
		left: 0,
		height: '-webkit-fill-available',
		width: '-webkit-fill-available',
	},
	menu: {
		padding: 5,
		background: theme.palette.secondary.main,
		zIndex: 999,
		fontSize: 18,
		margin: 5,
		width: '40%',
	},
	showAll: {
		color: theme.palette.text.light,
		fontSize: 30,
		position: 'absolute',
		bottom: '19%',
		left: 0,
		right: 0,
		margin: 'auto',
		width: 'fit-content',
		padding: 5,
		zIndex: 5,
		'&:hover': {
			color: theme.palette.primary.main,
			transition: 'color ease-in 0.15s',
		},
	},
}));

const NotifCount = withStyles(theme => ({
	root: {
		width: 24,
		height: 24,
		fontSize: 16,
		lineHeight: '24px',
		color: '#fff',
		background: '#ff0000',
	},
}))(Avatar);

export default connect(null, {
	showAlert,
	addNotif,
	dismissNotif,
	openedApp,
	dismissNotifAll,
	uninstall,
	addToHome,
	removeFromHome,
	addToDock,
	removeFromDock,
	reorderApp,
	resetApp,
})(props => {
	const classes = useStyles();
	let navigate = useNavigate();
	const apps = useSelector(state => state.phone.apps);
	const homeApps = useSelector(state => state.data.data.home);
	const dockedApps = useSelector(state => state.data.data.docked);
	const notifications = useSelector(
		state => state.notifications.notifications,
	);

	const [contextApp, setContextApp] = useState(null);
	const [contextDock, setContextDock] = useState(false);
	const [offset, setOffset] = useState({
		left: 110,
		top: 0,
	});

	useEffect(() => {
		props.resetApp();
	}, []);

	const viewList = () => {
		navigate('/apps');
	};

	const onClick = app => {
		props.openedApp(app);
		navigate(`/apps/${app}`);
	};

	const openApp = () => {
		props.openedApp(contextApp);
		navigate(`/apps/${contextApp}`);
	};

	const onRightClick = (e, app, isDock = false) => {
		e.preventDefault();
		setOffset({ left: e.clientX - 2, top: e.clientY - 4 });
		if (app != null) setContextApp(app);
		setContextDock(isDock);
	};

	const closeContext = e => {
		if (e != null) e.preventDefault();
		setContextDock(null);
		setContextApp(null);
	};

	const addToHome = () => {
		props.addToHome(contextApp);
		props.showAlert(`${apps[contextApp].label} Added To Home Screen`);
		closeContext();
	};

	const removeFromHome = () => {
		props.removeFromHome(contextApp);
		props.showAlert(`${apps[contextApp].label} Removed Home Screen`);
		closeContext();
	};

	const dockApp = () => {
		if (dockedApps.length < 4) {
			props.addToDock(contextApp);
			props.showAlert(`${apps[contextApp].label} Added To Dock`);
		} else props.showAlert('Can Only Have 4 Apps In Dock');
		closeContext();
	};

	const undockApp = () => {
		props.removeFromDock(contextApp);
		props.showAlert(`${apps[contextApp].label} Removed From Dock`);
		closeContext();
	};

	const uninstallApp = () => {
		props.uninstall(contextApp);
		closeContext();
	};

	const reorderApp = index => {
		let a = Array();
		if (contextDock) {
			a = dockedApps.filter(app => app !== contextApp);
			a.splice(index, 0, contextApp);
		} else {
			a = homeApps.filter(app => app !== contextApp);
			a.splice(index, 0, contextApp);
		}

		props.reorderApp({ type: contextDock ? 'docked' : 'home', data: a });

		closeContext();
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.grid}>
				{Object.keys(apps).length > 0
					? homeApps.map((app, i) => {
							let data = apps[app];
							let nCount = notifications.filter(n => n.app == app)
								.length;
							return (
								<div
									key={i}
									className={
										contextApp === app && !contextDock
											? classes.appContext
											: classes.appBtn
									}
									title={data.label}
									onClick={() => onClick(app)}
									onContextMenu={e => onRightClick(e, app)}
								>
									{nCount > 0 ? (
										<Badge
											overlap="circle"
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
											badgeContent={
												<NotifCount
													style={{
														border: `2px solid ${data.color}`,
													}}
												>
													{nCount}
												</NotifCount>
											}
										>
											<Avatar
												variant="rounded"
												className={classes.appIcon}
												style={{
													background: `${data.color}`,
												}}
											>
												<FontAwesomeIcon
													icon={data.icon}
												/>
											</Avatar>
										</Badge>
									) : (
										<Avatar
											variant="rounded"
											className={classes.appIcon}
											style={{
												background: `${data.color}`,
											}}
										>
											<FontAwesomeIcon icon={data.icon} />
										</Avatar>
									)}
									<div className={classes.appLabel}>
										{data.label}
									</div>
								</div>
							);
					  })
					: null}
			</div>
			<div className={classes.dock}>
				{Object.keys(apps).length > 0 && dockedApps.length > 0
					? dockedApps.slice(0, 4).map((app, i) => {
							let data = apps[app];
							let nCount = notifications.filter(n => n.app == app)
								.length;
							return (
								<div
									key={i}
									className={
										contextApp === app && contextDock
											? classes.dockContext
											: classes.dockBtn
									}
									title={data.label}
									onClick={() => onClick(app)}
									onContextMenu={e =>
										onRightClick(e, app, true)
									}
								>
									{nCount > 0 ? (
										<Badge
											overlap="circle"
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
											badgeContent={
												<NotifCount
													style={{
														border: `2px solid ${data.color}`,
													}}
												>
													{nCount}
												</NotifCount>
											}
										>
											<Avatar
												variant="rounded"
												className={classes.appIcon}
												style={{
													background: `${data.color}`,
												}}
											>
												<FontAwesomeIcon
													icon={data.icon}
												/>
											</Avatar>
										</Badge>
									) : (
										<Avatar
											variant="rounded"
											className={classes.appIcon}
											style={{
												background: `${data.color}`,
											}}
										>
											<FontAwesomeIcon icon={data.icon} />
										</Avatar>
									)}
								</div>
							);
					  })
					: null}
			</div>

			{contextApp != null ? (
				<Menu
					keepMounted
					onClose={closeContext}
					onContextMenu={closeContext}
					open={!!contextApp}
					anchorReference="anchorPosition"
					anchorPosition={offset}
				>
					<MenuItem disabled>{apps[contextApp].label}</MenuItem>
					{dockedApps.length > 0 &&
					dockedApps.filter(app => app == contextApp).length > 0 ? (
						<MenuItem onClick={undockApp}>
							Remove From Dock
						</MenuItem>
					) : (
						<MenuItem
							disabled={dockedApps.length >= 4}
							onClick={dockApp}
						>
							Add To Dock
						</MenuItem>
					)}
					{homeApps.length > 0 &&
					homeApps.filter(app => app == contextApp).length > 0 ? (
						<div>
							<MenuItem onClick={removeFromHome}>
								Remove From Home
							</MenuItem>
							<NestedMenuItem
								label="Reorder"
								parentMenuOpen={!!contextApp}
							>
								{contextDock ? (
									<MenuItem
										disabled={dockedApps[0] === contextApp}
										onClick={() => reorderApp(0)}
									>
										Start
									</MenuItem>
								) : (
									<MenuItem
										disabled={homeApps[0] === contextApp}
										onClick={() => reorderApp(0)}
									>
										Start
									</MenuItem>
								)}
								{contextDock ? (
									<MenuItem
										disabled={
											dockedApps[
												dockedApps.length - 1
											] === contextApp
										}
										onClick={() =>
											reorderApp(dockedApps.length - 1)
										}
									>
										End
									</MenuItem>
								) : (
									<MenuItem
										disabled={
											homeApps[homeApps.length - 1] ===
											contextApp
										}
										onClick={() =>
											reorderApp(homeApps.length - 1)
										}
									>
										End
									</MenuItem>
								)}
								<NestedMenuItem
									label="By Index"
									parentMenuOpen={!!contextApp}
								>
									{contextDock
										? dockedApps.map((app, i) => {
												if (contextApp !== app)
													return (
														<MenuItem
															key={i}
															onClick={() =>
																reorderApp(i)
															}
														>
															Index {i + 1}
														</MenuItem>
													);
												else
													return (
														<MenuItem
															key={i}
															disabled
														>
															Index {i + 1}
														</MenuItem>
													);
										  })
										: homeApps.map((app, i) => {
												if (contextApp !== app)
													return (
														<MenuItem
															key={i}
															onClick={() =>
																reorderApp(i)
															}
														>
															Index {i + 1}
														</MenuItem>
													);
												else
													return (
														<MenuItem
															key={i}
															disabled
														>
															Index {i + 1}
														</MenuItem>
													);
										  })}
								</NestedMenuItem>
							</NestedMenuItem>
						</div>
					) : (
						<MenuItem onClick={addToHome}>Add To Home</MenuItem>
					)}
					<MenuItem onClick={openApp}>
						Open {apps[contextApp].label}
					</MenuItem>
					{apps[contextApp].canUninstall ? (
						<MenuItem onClick={uninstallApp}>
							Uninstall {apps[contextApp].label}
						</MenuItem>
					) : null}
				</Menu>
			) : null}

			<div className={classes.showAll} onClick={viewList}>
				<FontAwesomeIcon icon="angle-up" />
			</div>
		</div>
	);
});
