import React from "react";
import { withStateMachine, State } from "react-automata";

import { statechart } from "./statechart";
import { fetchCarriers, fetchPlans } from "./fetchInsuranceData";
import { InsuranceList } from "./InsuranceList";
import { Loading } from "./Loading";
import { ResetInsuranceQuestion } from "./ResetInsuranceQuestion";

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

  reset = () => {
    this.setState({
      selectedCarrier: null,
      selectedPlan: null,
      carriers: [],
      plans: []
    });
    this.props.transition("RESET");
  };

  render() {
    const { carriers, plans, selectedCarrier, selectedPlan } = this.state;

    const selectedInsurance = [selectedCarrier, selectedPlan]
      .filter(Boolean)
      .join(", ");

    return (
      <div className="container">
        <input
          value={selectedInsurance}
          onClick={() => this.props.transition("INPUT_CLICKED")}
        />

        <State is="menu.visibility.shown">
          <div
            className="takeover"
            onClick={() => this.props.transition("CLICKED_OUTSIDE")}
          />
          <State is="menu.insuranceOptions.*.loading">
            <Loading />
          </State>
          <State is="menu.insuranceOptions.carrierSelection.*">
            <InsuranceList list={carriers} onSelect={this.selectCarrier} />
          </State>
          <State is="menu.insuranceOptions.planSelection.*">
            <InsuranceList list={plans} onSelect={this.selectPlan} />
          </State>
          <State is="menu.insuranceOptions.resetInsuranceQuestion">
            <ResetInsuranceQuestion onReset={this.reset} />
          </State>
        </State>
      </div>
    );
  }
}

const InsurancePicker = withStateMachine(statechart)(Container);

export { InsurancePicker };
