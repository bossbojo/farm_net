import { baseUrlimg } from './../../configs/url.config';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { jalert, jconfirm } from '../../configs/alert.config';

@Component({
  selector: 'app-create-sensor',
  templateUrl: './create-sensor.component.html',
  styleUrls: ['./create-sensor.component.scss']
})
export class CreateSensorComponent implements OnInit {
  baseUrlimg = baseUrlimg;
  SensorTypeData:any[]=[];
  SensorType:any;
  MySensor:any;
  FromCreateSensor:FormGroup;
  FromEditSensor:FormGroup;
  IdEdit:any;
  ImageBase64: string;
  FromSensorCamera:FormGroup;
  FromSensorMoisture:FormGroup;
  FromSensorMoistureLevel:FormGroup;
  FromSensorRaining:FormGroup;
  FromSensorTemp:FormGroup;
  FromSensorUv:FormGroup;
  FromSensorWind:FormGroup;
  FromSensorSoil:FormGroup;
  constructor(private http:HttpService,private build:FormBuilder) { 
    this.FromCreateSensor = this.build.group({
      "sensor_name": ['',[Validators.required]],
      "sensor_type_id": ['',[Validators.required]],
    });
    this.FromEditSensor = this.build.group({
      "sensor_name": ['',[Validators.required]]
    });
    this.FromSensorCamera  = this.build.group({
      "sensor_id": ['',[Validators.required]],
      "image": ['',[Validators.required]]
    });
    this.FromSensorMoisture = this.build.group({
      "sensor_id": ['',[Validators.required]],
      "moisture": ['',[Validators.required]]
    });
    this.FromSensorMoistureLevel = this.build.group({
      "sensor_id": ['',[Validators.required]],
      "moisture_level": ['',[Validators.required]]
    });
    this.FromSensorRaining = this.build.group({
      "sensor_id": ['',[Validators.required]],
      "raining": ['0',[Validators.required]]
    });
    this.FromSensorTemp = this.build.group({
      "sensor_id": ['',[Validators.required]],
      "temp": ['',[Validators.required]]
    });
    this.FromSensorUv = this.build.group({
      "sensor_id": ['',[Validators.required]],
      "uv": ['',[Validators.required]]
    });
    this.FromSensorWind = this.build.group({
      "sensor_id": ['',[Validators.required]],
      "wind": ['',[Validators.required]]
    });
    this.FromSensorSoil = this.build.group({
      "sensor_id": ['',[Validators.required]],
      "soil": ['',[Validators.required]]
    });
  }

  ngOnInit() {
    this.GetSensorType();
    this.GetMySensor();
  }
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ImageBase64 = reader.result;
        this.FromSensorCamera.controls['image'].setValue(reader.result);
      };
    }
  }
  GetSensorType(){
    this.http.requestGet('get/all/sensor_type').subscribe((res:any)=>{
      this.SensorType = res.data;
      this.SensorType.forEach(element => {
        this.SensorTypeData[element.Id] = element.sensor_type_name;
      });
      console.log(this.SensorType);
      
    });
  }
  GetMySensor(){
    this.http.requestGet('get/my/sensor').subscribe((res:any)=>{
      if(res.data.length > 0){
        this.MySensor = res.data;
      }
    });
  }
  OnSubmitCreate(){
    if(this.FromCreateSensor.valid){
      this.http.requestPost('create/mysensor',this.FromCreateSensor.value).subscribe((res:any)=>{
        this.GetMySensor();
        $('#CreateSensorModal').modal('hide');
      });
    }else{
      jalert('คำเตือน','กรุณาใสข้อมูลให้ครบ')
    }
  }
  OnSubmitEdit(){
    if(this.FromEditSensor.valid){
      this.http.requestPut(`edit/mysensor?Id=${this.IdEdit}`,this.FromEditSensor.value).subscribe((res:any)=>{
        this.GetMySensor();
        $('#EditSensorModal').modal('hide');
      });
    }else{
      jalert('คำเตือน','กรุณาใสข้อมูลให้ครบ')
    }
  }
  OnRemove(id){
    jconfirm('คำเตือน','คุณต้องการลบ?').then((res)=>{
      if(!res)return;
      this.http.requestDelete(`delete/mysensor?Id=${id}`).subscribe((res:any)=>{
        this.GetMySensor();
      })
    })
  }
  OnOpenModal(i,sensor_id){
    if(i == 1){ //camera
      this.FromSensorCamera.controls['sensor_id'].setValue(sensor_id);
      $('#SensorCamera').modal('show');
    }
    if(i == 2){//moisture sensor
      this.FromSensorMoisture.controls['sensor_id'].setValue(sensor_id);
      $('#SensorMoisture').modal('show');
    }
    if(i == 3){//moisture level sensor
      this.FromSensorMoistureLevel.controls['sensor_id'].setValue(sensor_id);
      $('#SensorMoistureLevel').modal('show');
    }
    if(i == 4){//raining
      this.FromSensorRaining.controls['sensor_id'].setValue(sensor_id);
      $('#SensorRaining').modal('show');
    }
    if(i == 5){//temp
      this.FromSensorTemp.controls['sensor_id'].setValue(sensor_id);
      $('#SensorTemp').modal('show');
    }
    if(i == 6){//uv
      this.FromSensorUv.controls['sensor_id'].setValue(sensor_id);
      $('#SensorUV').modal('show');
    }
    if(i == 7){//wind
      this.FromSensorWind.controls['sensor_id'].setValue(sensor_id);
      $('#SensorWind').modal('show');
    }
    if(i == 8){//Soil
      this.FromSensorSoil.controls['sensor_id'].setValue(sensor_id);
      $('#SensorSoil').modal('show');
    }
  }
  //submit camera 
  OnSubmitCamera(){
    if(this.FromSensorCamera.valid){
      this.http.requestPost(`create/image`,this.FromSensorCamera.value).subscribe((res:any)=>{
        console.log(res);
        
        $('#SensorCamera').modal('hide');
      },(err:any)=>{
        jalert('คำเตือน',err.data.Message);
      });
    }else{
      jalert('คำเตือน','กรุณาใสข้อมูลให้ครบ');
    }
  }
  //submit moisture sensor
  OnSubmitMoisture(){
    if(this.FromSensorMoisture.valid){
      this.http.requestPost(`save/moisture`,this.FromSensorMoisture.value).subscribe((res:any)=>{
        $('#SensorMoisture').modal('hide');
      },(err:any)=>{
        jalert('คำเตือน',err.data.Massage);
      });
    }else{
      jalert('คำเตือน','กรุณาใสข้อมูลให้ครบ');
    }
  }
  //submit moisture level sensor
  OnSubmitMoistureLevel(){
    if(this.FromSensorMoistureLevel.valid){
      this.http.requestPost(`save/moisture_level`,this.FromSensorMoistureLevel.value).subscribe((res:any)=>{
        $('#SensorMoistureLevel').modal('hide');
      },(err:any)=>{
        jalert('คำเตือน',err.data.Massage);
      });
    }else{
      jalert('คำเตือน','กรุณาใสข้อมูลให้ครบ');
    }
  }
  //submit raining
  OnSubmitRaining(){
    if(this.FromSensorRaining.valid){
      this.http.requestPost(`save/raining`,this.FromSensorRaining.value).subscribe((res:any)=>{
        $('#SensorRaining').modal('hide');
      },(err:any)=>{
        jalert('คำเตือน',err.data.Massage);
      });
    }else{
      jalert('คำเตือน','กรุณาใสข้อมูลให้ครบ');
    }
  }
  //submit temp
  OnSubmitTemp(){
    if(this.FromSensorTemp.valid){
      this.http.requestPost(`save/temp`,this.FromSensorTemp.value).subscribe((res:any)=>{
        $('#SensorTemp').modal('hide');
      },(err:any)=>{
        jalert('คำเตือน',err.data.Massage);
      });
    }else{
      jalert('คำเตือน','กรุณาใสข้อมูลให้ครบ');
    }
  }
  //submit uv
  OnSubmitUv(){
    if(this.FromSensorUv.valid){
      this.http.requestPost(`save/uv`,this.FromSensorUv.value).subscribe((res:any)=>{
        $('#SensorUV').modal('hide');
      },(err:any)=>{
        jalert('คำเตือน',err.data.Massage);
      });
    }else{
      jalert('คำเตือน','กรุณาใสข้อมูลให้ครบ');
    }
  }
  //submit wind
  OnSubmitWind(){
    if(this.FromSensorWind.valid){
      this.http.requestPost(`save/wind`,this.FromSensorWind.value).subscribe((res:any)=>{
        console.log(res);
        
        $('#SensorWind').modal('hide');
      },(err:any)=>{
        console.log(err);
        
        jalert('คำเตือน',err.data.Massage);
      });
    }else{
      jalert('คำเตือน','กรุณาใสข้อมูลให้ครบ');
    }
  }
    //submit soil
    OnSubmitSoil(){
      if(this.FromSensorSoil.valid){
        this.http.requestPost(`save/soil`,this.FromSensorSoil.value).subscribe((res:any)=>{
          $('#SensorSoil').modal('hide');
        },(err:any)=>{
          jalert('คำเตือน',err.Massage);
        });
      }else{
        jalert('คำเตือน','กรุณาใสข้อมูลให้ครบ');
      }
    }
  TypeSensor:any;
  DataShowById:any;
  GetDataSensorById(type,sensor_id){
    this.TypeSensor = this.SensorTypeData[type];
    if(type == 1){ //camera
      this.http.requestGet(`get//images?sensor_id=${sensor_id}`).subscribe((res:any)=>{
        this.DataShowById = res.data;
        $('#HistroySensorModal').modal('show');
      });

    }
    if(type == 2){//moisture sensor
      this.http.requestGet(`get/moisture/?sensor_id=${sensor_id}`).subscribe((res:any)=>{
        this.DataShowById = res.data;
        $('#HistroySensorModal').modal('show');
      });
    }
    if(type == 3){//moisture level sensor
      this.http.requestGet(`get/moisture_level/?sensor_id=${sensor_id}`).subscribe((res:any)=>{
        this.DataShowById = res.data;
        $('#HistroySensorModal').modal('show');
      });
    }
    if(type == 4){//raining
      this.http.requestGet(`get/raining/?sensor_id=${sensor_id}`).subscribe((res:any)=>{
        this.DataShowById = res.data;
        $('#HistroySensorModal').modal('show');
      });
    }
    if(type == 5){//temp
      this.http.requestGet(`get/temp/?sensor_id=${sensor_id}`).subscribe((res:any)=>{
        this.DataShowById = res.data;
        $('#HistroySensorModal').modal('show');
      });
    }
    if(type == 6){//uv
      this.http.requestGet(`get/uv/?sensor_id=${sensor_id}`).subscribe((res:any)=>{
        this.DataShowById = res.data;
        $('#HistroySensorModal').modal('show');
      });
    }
    if(type == 7){//wind
      this.http.requestGet(`get/wind/?sensor_id=${sensor_id}`).subscribe((res:any)=>{
        this.DataShowById = res.data;
        $('#HistroySensorModal').modal('show');
      });
    }
    if(type == 8){//soil
      this.http.requestGet(`get/soil/?sensor_id=${sensor_id}`).subscribe((res:any)=>{
        this.DataShowById = res.data;
        $('#HistroySensorModal').modal('show');
      });
    }
  }
}
