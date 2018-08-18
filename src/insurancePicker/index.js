import React from "react";
import { withStateMachine } from "react-automata";

import { statechart } from "./statechart";
import { fetchCarriers } from "./fetchInsuranceData";
import { InsuranceList } from "./InsuranceList";

class Container extends React.Component {
  state = {
    carriers: [],
    plans: [],
    selectedCarrier: null,
    selectedPlan: null
  };

  fetchCarriers() {
    fetchCarriers()
      .then(carriers => this.setState({ carriers }))
      .then(() => this.props.transition("CARRIERS_FETCHED"))
      .catch(() => this.props.transition("FETCH_CARRIERS_ERROR"));
  }

  render() {
    const { carriers, selectedCarrier, selectedPlan } = this.state;

    const selectedInsurance = [selectedCarrier, selectedPlan]
      .filter(Boolean)
      .join(", ");

    return (
      <div>
        <input value={selectedInsurance} />
        <InsuranceList list={carriers} onSelect={() => {}} />
        <div className="debug">
          <pre>{JSON.stringify(this.props.machineState.value, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

const InsurancePicker = withStateMachine(statechart)(Container);

export { InsurancePicker };
