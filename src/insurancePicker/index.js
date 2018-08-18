import React from "react";
import { withStateMachine, State } from "react-automata";

import { statechart } from "./statechart";
import { fetchCarriers, fetchPlans } from "./fetchInsuranceData";
import { InsuranceList } from "./InsuranceList";

class Container extends React.Component {
  state = {
    selectedCarrier: null,
    selectedPlan: null,
    carriers: [],
    plans: []
  };

  fetchCarriers() {
    fetchCarriers()
      .then(carriers => this.setState({ carriers }))
      .then(() => this.props.transition("CARRIERS_FETCHED"))
      .catch(() => this.props.transition("FETCH_CARRIERS_ERROR"));
  }

  fetchPlans() {
    fetchPlans(this.state.selectedCarrier)
      .then(plans => this.setState({ plans }))
      .then(() => this.props.transition("PLANS_FETCHED"))
      .catch(() => this.props.transition("FETCH_PLANS_ERROR"));
  }

  selectCarrier = selectedCarrier => {
    this.setState({ selectedCarrier });
    this.props.transition("CARRIER_SELECTED");
  };

  selectPlan = selectedPlan => {
    this.setState({ selectedPlan });
    this.props.transition("PLAN_SELECTED");
  };

  render() {
    const { carriers, plans, selectedCarrier, selectedPlan } = this.state;

    const selectedInsurance = [selectedCarrier, selectedPlan]
      .filter(Boolean)
      .join(", ");

    return (
      <div>
        <input
          value={selectedInsurance}
          onClick={() => this.props.transition("INPUT_CLICKED")}
        />

        <State is="menu.visibility.shown">
          <State is="menu.insuranceOptions.carrierSelection.*">
            <InsuranceList list={carriers} onSelect={this.selectCarrier} />
          </State>
          <State is="menu.insuranceOptions.planSelection.*">
            <InsuranceList list={plans} onSelect={this.selectPlan} />
          </State>
          <State is="menu.insuranceOptions.resetInsuranceQuestion.*">
            Do you want to choose your insurance again?
          </State>
        </State>

        <div className="debug">
          STATE MACHINE
          <pre>{JSON.stringify(this.props.machineState.value, null, 2)}</pre>
          COMPONENT STATE
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

const InsurancePicker = withStateMachine(statechart)(Container);

export { InsurancePicker };
