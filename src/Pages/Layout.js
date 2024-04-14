// Import necessary libraries
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Create your component
const ResponsiveLayout = () => {
	return (
		<Container>
			{/* First Row */}
			<Row>
				<Col md={6}>
					{/* Content for the first column in the first row */}
					<div style={{ border: "1px solid #ddd", padding: "10px" }}>
						Column 1, Row 1
					</div>
				</Col>
				<Col md={6}>
					{/* Content for the second column in the first row */}
					<div style={{ border: "1px solid #ddd", padding: "10px" }}>
						Column 2, Row 1
					</div>
				</Col>
			</Row>

			{/* Second Row */}
			<Row>
				<Col md={6}>
					{/* Content for the first column in the second row */}
					<div style={{ border: "1px solid #ddd", padding: "10px" }}>
						Column 1, Row 2
					</div>
				</Col>
				<Col md={6}>
					{/* Content for the second column in the second row */}
					<div style={{ border: "1px solid #ddd", padding: "10px" }}>
						Column 2, Row 2
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default ResponsiveLayout;
