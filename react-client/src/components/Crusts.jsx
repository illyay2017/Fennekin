import React from 'react';
import $ from 'jquery';

class Crusts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crusts: [],
      selectedCrust: {}
    };

    this.handleCrustChange = this.handleCrustChange.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: '/crusts',
      method: 'GET',
      success: (data) => {
        this.setState({
          crusts: data,
          selectedCrust: data[0]
        }, function(){
          this.props.onCrustChange(this.state.selectedCrust);
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  handleCrustChange(event) {
    var selectedCrust = this.state.crusts[event.target.value];
    this.setState({selectedCrust: selectedCrust})
    this.props.onCrustChange(selectedCrust);
  }

  render() {
    return (
      <div id="crust">
        <form>
          <ol>
            {this.state.crusts.map((crust, idx) =>
              <li key={crust.id}>
                <label key={crust.id}>
                  <input type="radio" value={idx} key={crust.id} checked={this.state.selectedCrust.name === crust.name} onChange={this.handleCrustChange}/>
                  {crust.name}
                </label>
              </li>
            )}
          </ol>
       </form>
      </div>
    );
  }
}

export default Crusts;
