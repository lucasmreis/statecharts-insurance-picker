export const statechart = {
  key: "insurancePicker",
  parallel: true,
  states: {
    input: {
      initial: "empty",
      states: {
        empty: {
          on: { CARRIER_SELECTED: "showingCarrier" }
        },
        showingCarrier: {
          on: { PLAN_SELECTED: "showingCarrierAndPlan" }
        },
        showingCarrierAndPlan: {
          on: { RESET: "empty" }
        }
      }
    },
    menu: {
      parallel: true,
      states: {
        visibility: {
          initial: "hidden",
          states: {
            hidden: { on: { INPUT_CLICKED: "shown" } },
            shown: {
              on: {
                CLICKED_OUTSIDE: "hidden",
                PLAN_SELECTED: "hidden"
              }
            }
          }
        },
        insuranceOptions: {
          initial: "carrierSelection",
          states: {
            carrierSelection: {
              onEntry: "fetchCarriers",
              on: { CARRIER_SELECTED: "planSelection" },
              initial: "loading",
              states: {
                loading: {
                  on: {
                    CARRIERS_FETCHED: "carriersList",
                    FETCH_CARRIERS_ERROR: "loadingCarriersError"
                  }
                },
                loadingCarriersError: {
                  on: {
                    TRY_FETCHING_CARRIERS_AGAIN: "loading"
                  }
                },
                carriersList: {}
              }
            },
            planSelection: {
              onEntry: "fetchPlans",
              on: { PLAN_SELECTED: "resetInsuranceQuestion" },
              initial: "loading",
              states: {
                loading: {
                  on: {
                    PLANS_FETCHED: "plansList",
                    FETCH_PLANS_ERROR: "loadingPlansError"
                  }
                },
                loadingPlansError: {
                  on: {
                    TRY_FETCHING_PLANS_AGAIN: "loading"
                  }
                },
                plansList: {}
              }
            },
            resetInsuranceQuestion: {
              on: { RESET: "carrierSelection" }
            }
          }
        }
      }
    }
  }
};
