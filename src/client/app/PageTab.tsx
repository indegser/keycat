import React from 'react';
import styled, { css } from 'styled-components';

const Tabs = styled('div')`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	border: 1px solid #ddd;
	border-radius: 10px;
	overflow: hidden;
`;

const Tab = styled('div')`
	height: 32px;
	line-height: 32px;
	text-align: center;
	${({ selected }) => selected && css`
		color: #ddd;
		background: #2b2c2d;
		pointer-events: none;
	`}
`;

const PageTab = ({
	page,
	setPage,
}) => {

	const tabs = [
		'login',
		'transaction',
	];

	return (
		<Tabs>
			{tabs.map((tab) => (
				<Tab
					key={tab}
					selected={tab === page}
					onClick={() => setPage(tab)}
				>
					{tab}
				</Tab>
			))}
		</Tabs>
	)
}

export default PageTab;
