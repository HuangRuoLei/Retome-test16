//% color="#35D482" weight=30 icon="\uf11b" block="呼噜猫遥控器通信确认"
namespace HuLuMaoRemote_connection {
    /**
     * 调用此来建立MicroBit与遥控器的通信
     * @param index
    */
    //% blockId=HuLuMaoRemote_connection_con block="建立 MicroBit 与遥控器的通信"
    //% weight=100
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function con(): void {
        let length;
        for(let i=0;i<20;i++){
            length=pins.i2cReadNumber(66, NumberFormat.Int8LE);
            if(length==55){
                basic.showIcon(IconNames.Yes);
                break;
            }
            else{
                basic.showIcon(IconNames.No);
            }
        }
    }

    /**
     * 调用此来建立遥控器与小车的通信,并设置一个通信密码(最大为255)
     * @param index
    */
    //% blockId=HuLuMaoRemote_connection_con1 block="建立遥控器与小车的通信,通信密码为|%index"
    //% weight=100
    //% blockGap=10
    //% index.min=0 index.max=255
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function con1(index:number): void {
        let data=0;
        while(data!=0xAA){
            basic.pause(10);
            pins.i2cWriteNumber(75, index, NumberFormat.UInt8LE);
            basic.pause(10);
            data=pins.i2cReadNumber(75, NumberFormat.Int8LE);
        }
        
    }
}

//% color="#35D482" weight=29 icon="\uf11b" block="呼噜猫遥控器传感器类"
namespace HuLuMaoRemote {

    export enum ultrasonicState{
        //% blockId="OFF" block="关闭"
        Off = 0,
        //% blockId="Open" block="开启"
        Open = 1
    }
    export function IICWrite(value:number,value1:number) {
        
        pins.i2cWriteNumber(value, value1, NumberFormat.UInt8LE);
    }
    export function IICWriteBuf3(value: number, value1: number, value2: number) {
        let buf = pins.createBuffer(2);
        buf[0] = value1;
        buf[1] = value2;
        
        pins.i2cWriteBuffer(value, buf);
    }
    export function IICWriteBuf(value: number, value1: number, value2: number, value3: number, value4: number) {
        let buf = pins.createBuffer(4);
        buf[0] = value1;
        buf[1] = value2;
        buf[2] = value3;
        buf[3] = value4;
        
        pins.i2cWriteBuffer(value, buf);
    }
    function SPIWrite(value: number) {
        pins.spiPins(DigitalPin.P0, DigitalPin.P1, DigitalPin.P2);
        pins.spiFormat(8, 3);
        pins.spiFrequency(100000);
        pins.spiWrite(value);
    }
    /**
     * 选择以打开或关闭遥控器超声波测量距离的功能（有效距离2cm~200cm）
     * @param index
    */
    //% blockId=HuLuMaoRemote_Chao_Sheng_Bo block="超声波测距系统|%index"
    //% weight=110
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Chao_Sheng_Bo(index: ultrasonicState):void {
        basic.pause(10);
        switch (index) {
            case ultrasonicState.Off: IICWrite(65, 1); break;
            case ultrasonicState.Open: IICWrite(65, 2); break;
        }
    }

    /**
     * 调用此将返回超声波的所测到的距离（有效距离2cm~200cm）
     * @param index
    */
    //% blockId=HuLuMaoRemote_Read_Chao_Sheng_Bo block="读取超声波测到的距离(cm)"
    //% weight=109
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Read_Chao_Sheng_Bo(): number {
        let length;
        basic.pause(10);
        length=pins.i2cReadNumber(65, NumberFormat.Int8LE);
        return length;
    }
    /**
     * 选择以打开遥控器人体红外传感器功能
     * @param index
    */
    //% blockId=HuLuMaoRemote_Bodycheck block="当人体传感器检测到人体或者活物时"
    //% weight=98
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Bodycheck():boolean {
        let temp: boolean = false;
        if (pins.digitalReadPin(DigitalPin.P3) == 1) {
            temp = true;
        }
        else {
            temp = false;
        }
        return temp;
    }
    /**
     * 选择以打开遥控器水滴传感器功能
     * @param index
    */
    //% blockId=HuLuMaoRemote_Rain block="当水滴传感器检测到水滴时"
    //% weight=97
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Rain():boolean {
        let temp: boolean = false;
        if (pins.digitalReadPin(DigitalPin.P3) == 1) {
            temp = true;
        }
        else {
            temp = false;
        }
        return temp;
    }

    /**
     * 选择以打开遥控器气体传感器功能，可检测一氧化碳,烟雾，可燃气体等
     * @param index
    */
    //% blockId=HuLuMaoRemote_Gas block="当气体传感器检测到目标气体时"
    //% weight=96
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Gas():boolean {
        let temp: boolean = false;
        if (pins.digitalReadPin(DigitalPin.P3) == 1) {
            temp = true;
        }
        else {
            temp = false;
        }
        return temp;
    }
    /**
     * 选择以打开心率传感器，用手指按住即可测量心率
     * @param index
    */
    //% blockId=HuLuMaoRemote_heart block="当检测到心跳时"
    //% weight=95
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function heart():boolean {
        let temp: boolean = false;
        let temp1;
        temp1 = pins.analogReadPin(AnalogPin.P3);
        temp1 = (temp1 * 2.89) / 1000;
        if (temp1 > 2) {
            temp = true;
        }
        else {
            temp = false;
        }
        return temp;
    }

     /**
     * 调用此将返回光敏电阻返回的亮度值（0代表最暗，333代表最亮）
     * @param index
    */
    //% blockId=HuLuMaoRemote_Photoresistor block="读取光敏电阻测到的亮度(0代表最暗，333代表最亮)"
    //% weight=94
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Photoresistor(): number {
        let data;
        data=pins.analogReadPin(AnalogPin.P2);
        data=data*3.18%10;
        Math.round(data);
        return data;
    }

}
//% color="#35D482" weight=28 icon="\uf11b" block="呼噜猫遥控器音乐类"
namespace HuLuMaoRemote_music {

    export enum yingdiao{
        //% blockId="low" block="低音"
        low = 1,
        //% blockId="mid" block="中音"
        mid,
        //% blockId="high" block="高音"
        high
    }
    /**
     * 打开遥控器的七音符
     * @param index
    */
    //% blockId=HuLuMaoRemote_music_music block="将1到7按键设置为七音符（哆来咪发索拉西）,音调为|%index"
    //% weight=100
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function music(index:yingdiao): void {
        basic.pause(10);
        switch (index) {
            case yingdiao.low: pins.i2cWriteNumber(64, 1, NumberFormat.UInt8LE); break;
            case yingdiao.mid: pins.i2cWriteNumber(64, 2, NumberFormat.UInt8LE); break;
            case yingdiao.high: pins.i2cWriteNumber(64, 3, NumberFormat.UInt8LE); break;
        }   
    }
}

