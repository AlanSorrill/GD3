import React from 'react'
import { Device } from '../Helper'
export class Project1Root extends React.Component {
    render() {
        switch (Device.getType()) {
            case 'phone':
                return <StudentTradingCard />
            case 'tablet':
            case 'desktop':
                return <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}></div>
                    <div style={{ flexGrow: 1 }}>
                        <StudentTradingCard />
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                </div>
        }
    }
}

export class StudentTradingCard extends React.Component {
    overHang: number = 24;
    render() {
        return <div style={{ backgroundColor: '#F05F5F', width: '100%', height: '100%', fontFamily: "'Varela Round', sans-serif", color: 'white' }}>
            <div style={{ height: 250, width: '100%', position: 'relative', backgroundSize: 'cover', backgroundImage: "url('project1/background.png')" }}>
                <div style={{ width: 256, height: 256, position: 'absolute', bottom: 0, left: '50%', transform: `translate(-50%, ${this.overHang}px)`, backgroundSize: '100%', backgroundImage: "url('project1/alanSquare.jpg')", borderRadius: 24 }}>

                </div>
            </div>
            <div style={{fontSize: 36, textAlign: 'center', marginTop: this.overHang}}>Alan Sorrill</div>
        </div>
    }
}