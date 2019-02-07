import React from 'react';
import styled, { css } from 'styled-components';

const Tabs = styled('div')`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
`;

const Tab = styled('div')`
	height: 40px;
	line-height: 40px;
	text-align: center;
	${({ selected }) => selected && css`
		color: #ddd;
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
